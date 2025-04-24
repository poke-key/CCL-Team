export interface Game {
    id: number;
    opponent: string;
    result: 'win' | 'loss' | 'draw';
    date: string;
    chessComId?: string; //chess.com embed ID
    round?: string;
    timeControl?: string;
    playedAs?: 'white' | 'black';
    notes?: string;
    collegeTeam: string;
    playerName: string;
  }
  
  export interface CollegeTeam {
    name: string;
    id: string;
  }
  
  export interface PlayerPerformance {
    wins: number;
    losses: number;
    draws: number;
  }
  
  export interface MatchResults {
    wins: number;
    losses: number;
    draws: number;
  }

  export interface MatchDeficit {
    wins: number;
    losses: number;
    draws: number;
  }