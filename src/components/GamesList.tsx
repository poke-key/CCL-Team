// GamesList.tsx
import React from 'react';
import { Game } from './types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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
      <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
        <CardContent className="p-8 text-center">
          <div className="text-gray-500 dark:text-gray-400 text-lg">
            No games recorded for this selection.
          </div>
        </CardContent>
      </Card>
    );
  }

  const getResultBadge = (result: string) => {
    switch (result) {
      case 'win':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Win</Badge>;
      case 'loss':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Loss</Badge>;
      case 'draw':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Draw</Badge>;
      default:
        return <Badge variant="secondary">{result}</Badge>;
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Game Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800">
                <TableHead className="font-semibold">Player</TableHead>
                <TableHead className="font-semibold">Opponent</TableHead>
                <TableHead className="font-semibold">Round</TableHead>
                <TableHead className="font-semibold">Time Control</TableHead>
                <TableHead className="font-semibold">Played As</TableHead>
                <TableHead className="font-semibold">Result</TableHead>
                <TableHead className="font-semibold">Notes</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {games.map((game) => (
                <TableRow key={game.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <TableCell className="font-medium">{game.playerName}</TableCell>
                  <TableCell>{game.opponent}</TableCell>
                  <TableCell>{game.round || `Game ${game.id}`}</TableCell>
                  <TableCell>{game.timeControl || "-"}</TableCell>
                  <TableCell>
                    {game.playedAs ? (
                      <Badge variant="outline" className="capitalize">
                        {game.playedAs}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>{getResultBadge(game.result)}</TableCell>
                  <TableCell className="max-w-xs truncate">{game.notes || "-"}</TableCell>
                  <TableCell>
                    {game.chessComId ? (
                      <Button 
                        size="sm"
                        onClick={() => setSelectedGame(game)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        View Game
                      </Button>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500 text-sm">No game available</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default GamesList;