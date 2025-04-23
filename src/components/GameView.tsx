// GameView.tsx
import React from 'react';
import { Game } from './types';
import { formatMatchup } from './utils';
import ChessGameEmbed from './ChessGameEmbed';

interface GameViewProps {
  selectedGame: Game | null;
}

const GameView: React.FC<GameViewProps> = ({ selectedGame }) => {
  if (!selectedGame || !selectedGame.chessComId) {
    return null;
  }

  return (
    <div className="mt-8 border-t pt-6">
      <ChessGameEmbed 
        gameId={selectedGame.chessComId}
        title={`${selectedGame.round || 'Game'}: ${formatMatchup(
          selectedGame.playerName, 
          selectedGame.opponent, 
          selectedGame.playedAs
        )} (${selectedGame.timeControl || 'Standard Time'})`}
      />
    </div>
  );
};

export default GameView;