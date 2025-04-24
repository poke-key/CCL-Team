// utils.ts
import { Game, PlayerPerformance, MatchResults, MatchDeficit } from './types';

// Function to format player names based on who played as white/black
export const formatMatchup = (playerName: string, opponentName: string, playedAs?: 'white' | 'black') => {
  if (playedAs === 'white') {
    return `${playerName} vs ${opponentName}`;
  } else if (playedAs === 'black') {
    return `${opponentName} vs ${playerName}`;
  }
  return `${playerName} vs ${opponentName}`;
};

// Function to get player performance
export const getPlayerPerformance = (
  playerName: string, 
  collegeTeamGames: Game[]
): PlayerPerformance => {
  const playerGames = collegeTeamGames.filter(game => game.playerName === playerName);
  const wins = playerGames.filter(game => game.result === 'win').length;
  const losses = playerGames.filter(game => game.result === 'loss').length;
  const draws = playerGames.filter(game => game.result === 'draw' && game.opponent !== 'N/A').length;
  
  return { wins, losses, draws };
};

// Function to get match results count
export const getMatchResults = (collegeTeamGames: Game[]): MatchResults => {
  const playedGames = collegeTeamGames.filter(game => 
    game.opponent !== 'N/A' && game.chessComId
  );
  
  const wins = playedGames.filter(game => game.result === 'win').length;
  const losses = playedGames.filter(game => game.result === 'loss').length;
  const draws = playedGames.filter(game => game.result === 'draw' && game.opponent !== 'N/A').length;
  
  return { wins, losses, draws };
};

// Calculate match score
export const calculateMatchScore = (results: MatchResults): number => {
  return (results.wins + (results.draws * 0.5));
};

/*calculate deficit score*/
export const calculateDeficit = (results: MatchDeficit): number => {
  return (results.losses + (results.draws * 0.5));
};