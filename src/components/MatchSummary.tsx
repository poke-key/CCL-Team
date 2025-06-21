import React from 'react';
import { Game } from './types';
import { getMatchResults, calculateMatchScore, calculateDeficit, getPlayerPerformance } from './utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

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
  const { wins, losses, draws } = matchResults;

  return (
    <Card className="mb-6 shadow-lg border-2 border-blue-200 dark:border-blue-800">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Match Summary & Player Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800">
                <TableHead className="font-semibold text-gray-800 dark:text-gray-200">Player</TableHead>
                <TableHead className="text-center font-semibold text-gray-800 dark:text-gray-200">Wins</TableHead>
                <TableHead className="text-center font-semibold text-gray-800 dark:text-gray-200">Losses</TableHead>
                <TableHead className="text-center font-semibold text-gray-800 dark:text-gray-200">Draws</TableHead>
                <TableHead className="text-center font-semibold text-gray-800 dark:text-gray-200">Score</TableHead>
                <TableHead className="text-center font-semibold text-gray-800 dark:text-gray-200">Team Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-blue-50 dark:bg-blue-950/20 border-t-2 border-blue-200 dark:border-blue-800">
                <TableCell className="font-bold text-gray-800 dark:text-gray-200">Team Total</TableCell>
                <TableCell className="text-center">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-bold">
                    {wins}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 font-bold">
                    {losses}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 font-bold">
                    {draws}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-bold">
                    {score}-{deficit}
                  </Badge>
                </TableCell>
                <TableCell />
              </TableRow>
              {playerNames.map(name => {
                const performance = getPlayerPerformance(name, collegeTeamGames);
                const playerScore = performance.wins + performance.draws * 0.5;
                const totalGames = performance.wins + performance.losses + performance.draws;
                return (
                  <TableRow key={name} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <TableCell className="font-medium text-gray-800 dark:text-gray-200">{name}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="text-green-600 dark:text-green-400">
                        {performance.wins}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="text-red-600 dark:text-red-400">
                        {performance.losses}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="text-yellow-600 dark:text-yellow-400">
                        {performance.draws}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {totalGames > 0 ? (
                        <Badge variant="secondary" className="font-medium">
                          {playerScore}/{totalGames}
                        </Badge>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchSummary;