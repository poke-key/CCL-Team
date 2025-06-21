// GameView.tsx
import React from 'react';
import { Game } from './types';
import { formatMatchup } from './utils';
import ChessGameEmbed from './ChessGameEmbed';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

interface GameViewProps {
  selectedGame: Game | null;
}

const GameView: React.FC<GameViewProps> = ({ selectedGame }) => {
  if (!selectedGame || !selectedGame.chessComId) {
    return null;
  }

  return (
    <Card className="mt-8 shadow-xl border-2 border-blue-200 dark:border-blue-800">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {selectedGame.round || 'Game'}: {formatMatchup(
            selectedGame.playerName, 
            selectedGame.opponent, 
            selectedGame.playedAs
          )}
        </CardTitle>
        <div className="text-gray-600 dark:text-gray-400">
          {selectedGame.timeControl || 'Standard Time'}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ChessGameEmbed 
          gameId={selectedGame.chessComId}
          title={`${selectedGame.round || 'Game'}: ${formatMatchup(
            selectedGame.playerName, 
            selectedGame.opponent, 
            selectedGame.playedAs
          )} (${selectedGame.timeControl || 'Standard Time'})`}
        />
      </CardContent>
    </Card>
  );
};

export default GameView;