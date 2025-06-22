// GamesList.tsx
import React from 'react';
import { Game } from './types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface GamesListProps {
  games: Game[];
  setSelectedGame: (game: Game | null) => void;
}

const GamesList: React.FC<GamesListProps> = ({
  games,
  setSelectedGame
}) => {
  if (games.length === 0) {
    return (
      <div className="text-center p-16 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600">
        <div className="text-2xl text-slate-600 dark:text-slate-300 font-medium">
          No games recorded for this selection.
        </div>
      </div>
    );
  }

  const getResultBadge = (result: string) => {
    switch (result) {
      case 'win':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-bold text-lg px-3 py-1">Win</Badge>;
      case 'loss':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 font-bold text-lg px-3 py-1">Loss</Badge>;
      case 'draw':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 font-bold text-lg px-3 py-1">Draw</Badge>;
      default:
        return <Badge variant="secondary" className="text-lg px-3 py-1">{result}</Badge>;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl">
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          Game Results ({games.length} games)
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800/50">
              <TableHead className="font-bold text-slate-900 dark:text-slate-50 text-lg py-4">Player</TableHead>
              <TableHead className="font-bold text-slate-900 dark:text-slate-50 text-lg py-4">Opponent</TableHead>
              <TableHead className="font-bold text-slate-900 dark:text-slate-50 text-lg py-4">Round</TableHead>
              <TableHead className="font-bold text-slate-900 dark:text-slate-50 text-lg py-4">Time Control</TableHead>
              <TableHead className="font-bold text-slate-900 dark:text-slate-50 text-lg py-4">Played As</TableHead>
              <TableHead className="font-bold text-slate-900 dark:text-slate-50 text-lg py-4">Result</TableHead>
              <TableHead className="font-bold text-slate-900 dark:text-slate-50 text-lg py-4">Notes</TableHead>
              <TableHead className="font-bold text-slate-900 dark:text-slate-50 text-lg py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {games.map((game) => (
              <TableRow key={game.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-200 dark:border-slate-700">
                <TableCell className="font-semibold text-slate-900 dark:text-slate-50 text-lg py-4">{game.playerName}</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 text-lg py-4">{game.opponent}</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 text-lg py-4">{game.round || `Game ${game.id}`}</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 text-lg py-4">{game.timeControl || "-"}</TableCell>
                <TableCell className="py-4 capitalize text-lg text-slate-800 dark:text-slate-100">
                  {game.playedAs ? (
                    <span>
                      {game.playedAs}
                    </span>
                  ) : (
                    <span className="text-slate-500 dark:text-slate-400 text-lg">-</span>
                  )}
                </TableCell>
                <TableCell className="py-4">{getResultBadge(game.result)}</TableCell>
                <TableCell className="max-w-xs truncate text-slate-800 dark:text-slate-100 text-lg py-4">{game.notes || "-"}</TableCell>
                <TableCell className="py-4">
                  {game.chessComId ? (
                    <Button 
                      size="lg"
                      onClick={() => setSelectedGame(game)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-6 py-2"
                    >
                      View Game
                    </Button>
                  ) : (
                    <span className="text-slate-500 dark:text-slate-400 text-lg">No game available</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GamesList;