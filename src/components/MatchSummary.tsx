import React from 'react';
import { Game } from './types';
import { getMatchResults, calculateMatchScore, calculateDeficit, getPlayerPerformance } from './utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
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
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
          <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{wins}</div>
          <div className="text-lg text-green-800 dark:text-green-200 font-medium">Wins</div>
        </div>
        <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border-2 border-red-200 dark:border-red-800">
          <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">{losses}</div>
          <div className="text-lg text-red-800 dark:text-red-200 font-medium">Losses</div>
        </div>
        <div className="text-center p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
          <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">{draws}</div>
          <div className="text-lg text-yellow-800 dark:text-yellow-200 font-medium">Draws</div>
        </div>
        <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{score}-{deficit}</div>
          <div className="text-lg text-blue-800 dark:text-blue-200 font-medium">Score</div>
        </div>
      </div>

      {/* Player Performance Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl">
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Player Performance Breakdown
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                <TableHead className="font-bold text-slate-900 dark:text-slate-50 text-lg py-4">Player</TableHead>
                <TableHead className="text-center font-bold text-slate-900 dark:text-slate-50 text-lg py-4">Wins</TableHead>
                <TableHead className="text-center font-bold text-slate-900 dark:text-slate-50 text-lg py-4">Losses</TableHead>
                <TableHead className="text-center font-bold text-slate-900 dark:text-slate-50 text-lg py-4">Draws</TableHead>
                <TableHead className="text-center font-bold text-slate-900 dark:text-slate-50 text-lg py-4">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {playerNames.map(name => {
                const performance = getPlayerPerformance(name, collegeTeamGames);
                const playerScore = performance.wins + performance.draws * 0.5;
                const totalGames = performance.wins + performance.losses + performance.draws;
                return (
                  <TableRow key={name} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-200 dark:border-slate-700">
                    <TableCell className="font-semibold text-slate-900 dark:text-slate-50 text-lg py-4">{name}</TableCell>
                    <TableCell className="text-center py-4">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-bold text-lg px-3 py-1">
                        {performance.wins}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 font-bold text-lg px-3 py-1">
                        {performance.losses}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 font-bold text-lg px-3 py-1">
                        {performance.draws}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      {totalGames > 0 ? (
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-bold text-lg px-3 py-1">
                          {playerScore.toFixed(1)}/{totalGames}
                        </Badge>
                      ) : (
                        <span className="text-slate-500 dark:text-slate-400 text-lg">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MatchSummary;