import React, { useState, useEffect } from 'react';

interface PiecePosition {
  [square: string]: string; // e.g., "e4": "wP" (white pawn)
}

interface ChessBoardProps {
  fen: string;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ fen }) => {
  const [position, setPosition] = useState<PiecePosition>({});
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

  // Parse FEN string to get piece positions
  useEffect(() => {
    if (!fen) return;
    
    console.log("FEN:", fen);
    
    try {
      const fenParts = fen.split(' ');
      const piecePlacement = fenParts[0];
      const rows = piecePlacement.split('/');
      
      const newPosition: PiecePosition = {};
      
      rows.forEach((row, rankIndex) => {
        let fileIndex = 0;
        
        for (let i = 0; i < row.length; i++) {
          const char = row[i];
          
          if (/\d/.test(char)) {
            // If character is a number, skip that many files
            fileIndex += parseInt(char, 10);
          } else {
            // Otherwise, place a piece
            const square = `${files[fileIndex]}${ranks[rankIndex]}`;
            newPosition[square] = fenToPieceCode(char);
            fileIndex++;
          }
        }
      });
      
      setPosition(newPosition);
    } catch (err) {
      console.error("Error parsing FEN:", err);
    }
  }, [fen]);

  // Convert FEN piece notation to our internal representation
  const fenToPieceCode = (fenChar: string): string => {
    // p: black pawn, P: white pawn, etc.
    const pieceType = fenChar.toLowerCase();
    const isWhite = fenChar === fenChar.toUpperCase();
    return `${isWhite ? 'w' : 'b'}${pieceType.toUpperCase()}`;
  };

  // Get the piece for a square, or null if empty
  const getPiece = (file: string, rank: number): string | null => {
    const square = `${file}${rank}`;
    return position[square] || null;
  };

  // Convert our piece code to a Unicode chess piece
  const pieceToUnicode = (pieceCode: string | null): string => {
    if (!pieceCode) return '';
    
    const pieceMap: Record<string, string> = {
      'wP': '♙', 'wR': '♖', 'wN': '♘', 'wB': '♗', 'wQ': '♕', 'wK': '♔',
      'bP': '♟', 'bR': '♜', 'bN': '♞', 'bB': '♝', 'bQ': '♛', 'bK': '♚',
    };
    
    return pieceMap[pieceCode] || '';
  };

  // Determine if a square is light or dark
  const isLightSquare = (file: string, rank: number): boolean => {
    const fileIndex = files.indexOf(file);
    return (fileIndex + rank) % 2 === 0;
  };

  return (
    <div className="inline-block border-2 border-gray-800 select-none">
      {ranks.map(rank => (
        <div key={rank} className="flex">
          {files.map(file => {
            const squareColor = isLightSquare(file, rank) 
              ? 'bg-amber-200' 
              : 'bg-amber-800';
            
            const piece = getPiece(file, rank);
            const pieceColor = piece ? (piece.startsWith('w') ? 'text-white' : 'text-black') : '';
            
            return (
              <div 
                key={`${file}${rank}`} 
                className={`w-12 h-12 flex items-center justify-center ${squareColor}`}
                data-square={`${file}${rank}`}
              >
                <div className={`text-4xl ${pieceColor} drop-shadow-md piece-${piece}`}>
                  {pieceToUnicode(piece)}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;