// MatchSummary.tsx
import React from 'react';
import { Game } from './types';
import { getMatchResults, calculateMatchScore, calculateDeficit } from './utils';
import PlayerPerformance from './PlayerPerformance';

interface MatchSummaryProps {
  collegeTeamGames: Game[];
  playerNames: string[];
}

const MatchSummary: React.FC<MatchSummaryProps> = ({
  collegeTeamGames,
  playerNames
}) => {
  if (collegeTeamGames.length === 0) {
    return null;
  }

  const matchResults = getMatchResults(collegeTeamGames);
  const score = calculateMatchScore(matchResults);
  const deficit = calculateDeficit(matchResults);

  return (
    <div className="mb-6">
      <h5 className="font-medium text-lg mb-3">Match Summary</h5>
      
      {/* Match Statistics Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
        <table className="min-w-full">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="py-3 px-4 text-center">Wins</th>
              <th className="py-3 px-4 text-center">Losses</th>
              <th className="py-3 px-4 text-center">Draws</th>
              <th className="py-3 px-4 text-center">Match Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-4 px-6 text-center font-bold text-green-600 text-lg border-b">{matchResults.wins}</td>
              <td className="py-4 px-6 text-center font-bold text-red-600 text-lg border-b">{matchResults.losses}</td>
              <td className="py-4 px-6 text-center font-bold text-yellow-600 text-lg border-b">{matchResults.draws}</td>
              <td className="py-4 px-6 text-center font-bold text-blue-600 text-lg border-b">{score} - {deficit}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Player performance breakdown */}
      <PlayerPerformance 
        playerNames={playerNames}
        collegeTeamGames={collegeTeamGames}
      />
    </div>
  );
};

export default MatchSummary;