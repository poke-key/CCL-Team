// PlayerPerformance.tsx
import React from 'react';
import { Game } from './types';
import { getPlayerPerformance } from './utils';

interface PlayerPerformanceProps {
  playerNames: string[];
  collegeTeamGames: Game[];
}

const PlayerPerformance: React.FC<PlayerPerformanceProps> = ({
  playerNames,
  collegeTeamGames
}) => {
  if (playerNames.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h6 className="font-medium mb-2">Player Performance</h6>
      <div className="grid grid-cols-4 gap-2">
        {playerNames.map(name => {
          const performance = getPlayerPerformance(name, collegeTeamGames);
          const score = performance.wins + (performance.draws * 0.5);
          const total = performance.wins + performance.losses + performance.draws;
          
          return (
            <div key={name} className="p-2 bg-white rounded shadow-sm">
              <p className="font-medium text-sm">{name}</p>
              <p className="text-xs text-gray-700">
                {performance.wins}W - {performance.losses}L - {performance.draws}D
              </p>
              {total > 0 && (
                <p className="text-xs text-blue-600 mt-1">
                  Score: {score}/{total}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerPerformance;