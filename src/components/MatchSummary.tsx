import React from 'react';
import { Game } from './types';
import { getMatchResults, calculateMatchScore, calculateDeficit, getPlayerPerformance } from './utils';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

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
    <div className="mb-6 overflow-x-auto">
      <Table>
        <TableCaption>Match Summary and Player Performance</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            <TableHead className="text-center">Wins</TableHead>
            <TableHead className="text-center">Losses</TableHead>
            <TableHead className="text-center">Draws</TableHead>
            <TableHead className="text-center">Score</TableHead>
            <TableHead className="text-center">Team Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Team Total</TableCell>
            <TableCell className="text-center font-bold text-green-600">{wins}</TableCell>
            <TableCell className="text-center font-bold text-red-600">{losses}</TableCell>
            <TableCell className="text-center font-bold text-yellow-600">{draws}</TableCell>
            <TableCell className="text-center font-bold text-blue-600">{score}-{deficit}</TableCell>
            <TableCell />
          </TableRow>
          {playerNames.map(name => {
            const performance = getPlayerPerformance(name, collegeTeamGames);
            const playerScore = performance.wins + performance.draws * 0.5;
            const totalGames = performance.wins + performance.losses + performance.draws;
            return (
              <TableRow key={name}>
                <TableCell>{name}</TableCell>
                <TableCell className="text-center">{performance.wins}</TableCell>
                <TableCell className="text-center">{performance.losses}</TableCell>
                <TableCell className="text-center">{performance.draws}</TableCell>
                <TableCell className="text-center">{totalGames > 0 ? `${playerScore}/${totalGames}` : '-'}</TableCell>
                <TableCell />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MatchSummary;