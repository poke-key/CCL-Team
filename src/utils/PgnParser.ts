// PgnParser.ts

interface GameHeaders {
    Event?: string;
    Site?: string;
    Date?: string;
    Round?: string;
    White?: string;
    Black?: string;
    Result?: string;
    [key: string]: string | undefined;
  }
  
  interface PgnGame {
    headers: GameHeaders;
    moves: string[];
    result: string;
    initialFen?: string;
  }
  
  class PgnParser {
    static parse(pgnText: string): PgnGame[] {
      console.log("Parsing PGN text:", pgnText.substring(0, 100) + "...");
      
      // Split the PGN text into games
      const games: PgnGame[] = [];
      const gameTexts = this.splitIntoGames(pgnText);
      
      console.log(`Split into ${gameTexts.length} games`);
      
      gameTexts.forEach(gameText => {
        const game = this.parseGame(gameText);
        if (game) {
          games.push(game);
        }
      });
      
      return games;
    }
    
    private static splitIntoGames(pgnText: string): string[] {
      // Simple split on empty lines between games
      // This is a basic implementation and might need refinement for complex PGN files
      const games: string[] = [];
      let currentGame = '';
      let inTags = false;
      
      pgnText.split('\n').forEach(line => {
        const trimmedLine = line.trim();
        
        if (trimmedLine.startsWith('[')) {
          if (!inTags && currentGame.length > 0) {
            games.push(currentGame);
            currentGame = '';
          }
          inTags = true;
        } else if (trimmedLine === '' && inTags) {
          inTags = false;
        }
        
        if (trimmedLine !== '' || inTags) {
          currentGame += line + '\n';
        }
      });
      
      if (currentGame.length > 0) {
        games.push(currentGame);
      }
      
      return games;
    }
    
    private static parseGame(gameText: string): PgnGame | null {
      try {
        const headers = this.parseHeaders(gameText);
        const moveText = this.extractMoveText(gameText);
        
        console.log("Headers:", JSON.stringify(headers));
        console.log("Move text:", moveText.substring(0, 50) + "...");
        
        const moves = this.parseMoves(moveText);
        
        console.log(`Parsed ${moves.length} moves`);
        
        if (!headers || !moves.length) {
          console.error("No headers or moves found");
          return null;
        }
        
        return {
          headers,
          moves,
          result: headers.Result || '*',
          initialFen: headers.FEN
        };
      } catch (err) {
        console.error("Error parsing game:", err);
        return null;
      }
    }
    
    private static parseHeaders(gameText: string): GameHeaders {
      const headers: GameHeaders = {};
      const headerRegex = /\[(\w+)\s+"([^"]*)"\]/g;
      let match;
      
      while ((match = headerRegex.exec(gameText)) !== null) {
        const key = match[1];
        const value = match[2];
        headers[key] = value;
      }
      
      return headers;
    }
    
    private static extractMoveText(gameText: string): string {
      // Remove all header tags
      const textWithoutHeaders = gameText.replace(/\[\w+\s+"[^"]*"\]\s*/g, '');
      return textWithoutHeaders.trim();
    }
    
    private static parseMoves(moveText: string): string[] {
      // Remove comments and variations
      let cleanedText = moveText.replace(/\{[^}]*\}/g, ''); // Remove comments in curly braces
      cleanedText = cleanedText.replace(/\([^)]*\)/g, ''); // Remove variations in parentheses
      
      // Remove result at the end (1-0, 0-1, 1/2-1/2, *)
      cleanedText = cleanedText.replace(/\s*(1-0|0-1|1\/2-1\/2|\*)\s*$/, '');
      
      // Handle Chess.com format which may have line breaks in moves
      cleanedText = cleanedText.replace(/\n/g, ' ').trim();
      
      // Split the text into tokens
      const tokens = cleanedText.split(/\s+/);
      const moves: string[] = [];
      
      // Process tokens to extract moves
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        
        // Skip move numbers (e.g., "1.", "2.", etc.)
        if (/^\d+\.+$/.test(token)) {
          continue;
        }
        
        // Skip result tokens
        if (this.isResultNotation(token)) {
          continue;
        }
        
        // Valid move found
        moves.push(token);
      }
      
      return moves;
    }
    
    private static isResultNotation(text: string): boolean {
      return text === '1-0' || text === '0-1' || text === '1/2-1/2' || text === '*';
    }
  }
  
  export default PgnParser;