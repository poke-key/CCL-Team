// PlayerPerformance.tsx
import React from 'react';
import { Game } from './types';
import { getPlayerPerformance } from './utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

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
    <Card className="mt-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Player Performance Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {playerNames.map(name => {
            const performance = getPlayerPerformance(name, collegeTeamGames);
            const score = performance.wins + (performance.draws * 0.5);
            const total = performance.wins + performance.losses + performance.draws;
            
            return (
              <Card key={name} className="border-2 border-blue-200 dark:border-blue-800 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
                    {name}
                  </h4>
                  <div className="flex justify-center space-x-2 mb-3">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {performance.wins}W
                    </Badge>
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      {performance.losses}L
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      {performance.draws}D
                    </Badge>
                  </div>
                  {total > 0 && (
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {score}/{total}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerPerformance;