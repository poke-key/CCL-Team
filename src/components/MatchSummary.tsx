// MatchSummary.tsx
import React from 'react';
import { Game } from './types';
import { getMatchResults, calculateMatchScore, calculateDeficit } from './utils';
import PlayerPerformance from './PlayerPerformance';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

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
      
      <Table>
        <TableCaption>Match statistics and performance</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Wins</TableHead>
            <TableHead className="text-center">Losses</TableHead>
            <TableHead className="text-center">Draws</TableHead>
            <TableHead className="text-center">Match Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center font-bold text-green-600">{matchResults.wins}</TableCell>
            <TableCell className="text-center font-bold text-red-600">{matchResults.losses}</TableCell>
            <TableCell className="text-center font-bold text-yellow-600">{matchResults.draws}</TableCell>
            <TableCell className="text-center font-bold text-blue-600">{score} - {deficit}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      {/* Player performance breakdown */}
      <PlayerPerformance 
        playerNames={playerNames}
        collegeTeamGames={collegeTeamGames}
      />
    </div>
  );
};

export default MatchSummary;