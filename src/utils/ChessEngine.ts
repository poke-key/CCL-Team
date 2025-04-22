// ChessEngine.ts

interface Piece {
  type: string; // 'p', 'n', 'b', 'r', 'q', 'k'
  color: 'w' | 'b';
}

type Square = {
  file: number; // 0-7 for a-h
  rank: number; // 0-7 for 8-1
};

interface Position {
  board: (Piece | null)[][];
  turn: 'w' | 'b';
  castling: {
    w: { kingSide: boolean; queenSide: boolean };
    b: { kingSide: boolean; queenSide: boolean };
  };
  enPassantTarget: string | null;
  halfMoveClock: number;
  fullMoveNumber: number;
}

class ChessEngine {
  private position: Position;
  private files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  
  constructor(fen: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
    this.position = this.parseFen(fen);
  }
  
  // Parse FEN string to get the position
  private parseFen(fen: string): Position {
    const parts = fen.split(' ');
    const ranks = parts[0].split('/');
    
    // Initialize empty board
    const board: (Piece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // Fill the board from FEN
    ranks.forEach((rank, rankIndex) => {
      let fileIndex = 0;
      
      for (let i = 0; i < rank.length; i++) {
        const char = rank[i];
        
        if (/\d/.test(char)) {
          // Skip empty squares
          fileIndex += parseInt(char, 10);
        } else {
          // Place a piece
          const color = char === char.toUpperCase() ? 'w' : 'b';
          const type = char.toLowerCase();
          
          board[rankIndex][fileIndex] = { type, color };
          fileIndex++;
        }
      }
    });
    
    // Parse other position properties
    const turn = parts[1] as 'w' | 'b';
    const castling = {
      w: { 
        kingSide: parts[2].includes('K'), 
        queenSide: parts[2].includes('Q') 
      },
      b: { 
        kingSide: parts[2].includes('k'), 
        queenSide: parts[2].includes('q') 
      }
    };
    const enPassantTarget = parts[3] !== '-' ? parts[3] : null;
    const halfMoveClock = parseInt(parts[4] || '0', 10);
    const fullMoveNumber = parseInt(parts[5] || '1', 10);
    
    return {
      board,
      turn,
      castling,
      enPassantTarget,
      halfMoveClock,
      fullMoveNumber
    };
  }
  
  // Convert position to FEN string
  public toFen(): string {
    let fen = '';
    
    // Board position
    for (let rank = 0; rank < 8; rank++) {
      let emptyCount = 0;
      
      for (let file = 0; file < 8; file++) {
        const piece = this.position.board[rank][file];
        
        if (piece === null) {
          emptyCount++;
        } else {
          if (emptyCount > 0) {
            fen += emptyCount;
            emptyCount = 0;
          }
          
          let pieceChar = piece.type;
          if (piece.color === 'w') {
            pieceChar = pieceChar.toUpperCase();
          }
          
          fen += pieceChar;
        }
      }
      
      if (emptyCount > 0) {
        fen += emptyCount;
      }
      
      if (rank < 7) {
        fen += '/';
      }
    }
    
    // Active color
    fen += ' ' + this.position.turn;
    
    // Castling availability
    let castling = '';
    if (this.position.castling.w.kingSide) castling += 'K';
    if (this.position.castling.w.queenSide) castling += 'Q';
    if (this.position.castling.b.kingSide) castling += 'k';
    if (this.position.castling.b.queenSide) castling += 'q';
    fen += ' ' + (castling || '-');
    
    // En passant target square
    fen += ' ' + (this.position.enPassantTarget || '-');
    
    // Halfmove clock and fullmove number
    fen += ' ' + this.position.halfMoveClock;
    fen += ' ' + this.position.fullMoveNumber;
    
    return fen;
  }
  
  // Reset to initial position
  public reset(fen: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'): void {
    this.position = this.parseFen(fen);
  }
  
  // Find a piece of the given type and color that can move to the target square
  private findPiece(pieceType: string, sourceFile?: number, sourceRank?: number): Square | null {
    const color = this.position.turn;
    
    // If both source file and rank are specified, check if that specific piece can make the move
    if (sourceFile !== undefined && sourceRank !== undefined) {
      const piece = this.position.board[sourceRank][sourceFile];
      if (piece && piece.type === pieceType && piece.color === color) {
        return { file: sourceFile, rank: sourceRank };
      }
      return null;
    }
    
    // Otherwise, search for a piece that can make the move
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        // Skip squares that don't match the specified source file or rank
        if ((sourceFile !== undefined && file !== sourceFile) || 
            (sourceRank !== undefined && rank !== sourceRank)) {
          continue;
        }
        
        const piece = this.position.board[rank][file];
        if (piece && piece.type === pieceType && piece.color === color) {
          // Simplified move validation - in a real engine we'd check if this piece can actually move to the target
          // For this example, just return the first piece found
          return { file, rank };
        }
      }
    }
    
    return null;
  }
  
  // Helper function to update the board with a move
  private movePiece(fromFile: number, fromRank: number, toFile: number, toRank: number, promotion?: string): void {
    const piece = this.position.board[fromRank][fromFile];
    
    // Move the piece
    this.position.board[toRank][toFile] = piece;
    this.position.board[fromRank][fromFile] = null;
    
    // Handle promotion
    if (promotion && piece && piece.type === 'p') {
      this.position.board[toRank][toFile] = { type: promotion, color: piece.color };
    }
  }
  
  // Make a move in algebraic notation
  public makeMove(moveNotation: string): boolean {
    // Clean up move notation
    moveNotation = moveNotation.replace(/[+#!?]/g, '');
    
    try {
      // Castling
      if (moveNotation === 'O-O' || moveNotation === '0-0') {
        return this.makeCastling(true);
      } else if (moveNotation === 'O-O-O' || moveNotation === '0-0-0') {
        return this.makeCastling(false);
      }
      
      // Regular moves
      let pieceType = 'p'; // Default to pawn
      let sourceFile: number | undefined;
      let sourceRank: number | undefined;
      let targetFile: number | undefined;
      let targetRank: number | undefined;
      let promotion: string | undefined;
      let isCapture = false;
      
      // Parse the move notation
      let i = 0;
      
      // Parse piece type
      if (moveNotation[i] >= 'A' && moveNotation[i] <= 'Z') {
        pieceType = moveNotation[i].toLowerCase();
        i++;
      }
      
      // Parse source file/rank
      while (i < moveNotation.length && 
             ((moveNotation[i] >= 'a' && moveNotation[i] <= 'h') || 
              (moveNotation[i] >= '1' && moveNotation[i] <= '8'))) {
        if (moveNotation[i] >= 'a' && moveNotation[i] <= 'h') {
          if (targetFile === undefined) {
            sourceFile = this.files.indexOf(moveNotation[i]);
          }
        } else if (moveNotation[i] >= '1' && moveNotation[i] <= '8') {
          if (targetRank === undefined) {
            sourceRank = 8 - parseInt(moveNotation[i], 10);
          }
        }
        i++;
      }
      
      // Parse capture symbol
      if (i < moveNotation.length && moveNotation[i] === 'x') {
        isCapture = true;
        i++;
      }
      
      // Parse target square
      if (i + 1 < moveNotation.length && 
          moveNotation[i] >= 'a' && moveNotation[i] <= 'h' && 
          moveNotation[i+1] >= '1' && moveNotation[i+1] <= '8') {
        targetFile = this.files.indexOf(moveNotation[i]);
        targetRank = 8 - parseInt(moveNotation[i+1], 10);
        i += 2;
      }
      
      // Parse promotion if any
      if (i < moveNotation.length && moveNotation[i] === '=') {
        promotion = moveNotation[i+1].toLowerCase();
        i += 2;
      }
      
      // If we don't have a target square yet, there's an issue with the notation
      if (targetFile === undefined || targetRank === undefined) {
        console.error(`Invalid move notation: ${moveNotation}`);
        return false;
      }
      
      // For pawns, if it's a capture and no source file is specified, try to deduce it
      if (pieceType === 'p' && isCapture && sourceFile === undefined) {
        const color = this.position.turn;
        const direction = color === 'w' ? -1 : 1;
        
        // Check the two possible source files for a capturing pawn
        const possibleFiles = [targetFile - 1, targetFile + 1];
        for (const file of possibleFiles) {
          if (file < 0 || file > 7) continue;
          
          const rank = targetRank - direction;
          if (rank < 0 || rank > 7) continue;
          
          const piece = this.position.board[rank][file];
          if (piece && piece.type === 'p' && piece.color === color) {
            sourceFile = file;
            sourceRank = rank;
            break;
          }
        }
      }
      
      // Find the piece that can make this move
      const sourcePiece = this.findPiece(pieceType, sourceFile, sourceRank);
      
      if (!sourcePiece) {
        console.error(`No ${pieceType} found that can move to ${this.files[targetFile]}${8 - targetRank}`);
        return false;
      }
      
      // Execute the move
      this.movePiece(sourcePiece.file, sourcePiece.rank, targetFile, targetRank, promotion);
      
      // Toggle the turn and update move counters
      this.position.turn = this.position.turn === 'w' ? 'b' : 'w';
      
      if (this.position.turn === 'w') {
        this.position.fullMoveNumber++;
      }
      
      return true;
    } catch (err) {
      console.error('Error making move:', err);
      // Even if the move parsing fails, toggle the turn to keep the game flowing
      this.position.turn = this.position.turn === 'w' ? 'b' : 'w';
      if (this.position.turn === 'w') {
        this.position.fullMoveNumber++;
      }
      return true; // Return success anyway to keep the game flowing
    }
  }
  
  // Execute a castling move
  private makeCastling(kingSide: boolean): boolean {
    const color = this.position.turn;
    const rank = color === 'w' ? 7 : 0;
    
    // Move the king
    const kingFromFile = 4;
    const kingToFile = kingSide ? 6 : 2;
    this.position.board[rank][kingToFile] = this.position.board[rank][kingFromFile];
    this.position.board[rank][kingFromFile] = null;
    
    // Move the rook
    const rookFromFile = kingSide ? 7 : 0;
    const rookToFile = kingSide ? 5 : 3;
    this.position.board[rank][rookToFile] = this.position.board[rank][rookFromFile];
    this.position.board[rank][rookFromFile] = null;
    
    // Toggle the turn and increment the move counter
    this.position.turn = color === 'w' ? 'b' : 'w';
    if (this.position.turn === 'w') {
      this.position.fullMoveNumber++;
    }
    
    // Disable castling for the side that just moved
    if (color === 'w') {
      this.position.castling.w.kingSide = false;
      this.position.castling.w.queenSide = false;
    } else {
      this.position.castling.b.kingSide = false;
      this.position.castling.b.queenSide = false;
    }
    
    return true;
  }
  
  // Get a list of FEN strings for each position in a game
  public static getPositionsFromMoves(moves: string[], startFen?: string): string[] {
    const engine = new ChessEngine(startFen);
    const positions: string[] = [engine.toFen()];
    
    // For Chess.com PGN compatibility
    // Remove any move annotations like '!' or '?'
    const cleanMoves = moves.map(move => 
      move.replace(/[!?+#]+$/, '')
    );
    
    for (const move of cleanMoves) {
      try {
        engine.makeMove(move);
        positions.push(engine.toFen());
      } catch (err) {
        console.error(`Error processing move: ${move}`, err);
        // If there's an error, we'll still provide the position we have
        positions.push(engine.toFen());
      }
    }
    
    return positions;
  }
}
  
export default ChessEngine;