// MatchSummary.tsx
import React from 'react';
import { Game } from './types';
import { getMatchResults, calculateMatchScore } from './utils';
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

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h5 className="font-medium text-lg mb-2">Match Summary</h5>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-green-100 rounded">
              <p className="text-lg font-bold text-green-800">
                {matchResults.wins}
              </p>
              <p className="text-sm text-green-700">Wins</p>
            </div>
            <div className="p-3 bg-red-100 rounded">
              <p className="text-lg font-bold text-red-800">
                {matchResults.losses}
              </p>
              <p className="text-sm text-red-700">Losses</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded">
              <p className="text-lg font-bold text-yellow-800">
                {matchResults.draws}
              </p>
              <p className="text-sm text-yellow-700">Draws</p>
            </div>
          </div>
        </div>
        <div className="p-3 bg-blue-100 rounded text-center">
          <p className="text-lg font-bold text-blue-800">
            {score}
          </p>
          <p className="text-sm text-blue-700">Match Score</p>
        </div>
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