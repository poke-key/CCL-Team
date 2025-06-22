// GameView.tsx
import React from 'react';
import { Game } from './types';
import { formatMatchup } from './utils';
import ChessGameEmbed from './ChessGameEmbed';
import { Badge } from './ui/badge';

interface GameViewProps {
  selectedGame: Game | null;
}

const GameView: React.FC<GameViewProps> = ({ selectedGame }) => {
  if (!selectedGame || !selectedGame.chessComId) {
    return null;
  }

  const getResultBadge = (result: string) => {
    switch (result) {
      case 'win':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-bold text-lg px-4 py-2">Win</Badge>;
      case 'loss':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 font-bold text-lg px-4 py-2">Loss</Badge>;
      case 'draw':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 font-bold text-lg px-4 py-2">Draw</Badge>;
      default:
        return <Badge variant="secondary" className="text-lg px-4 py-2">{result}</Badge>;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl">
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20 px-8 py-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
              {selectedGame.round || 'Game'}: {formatMatchup(
                selectedGame.playerName, 
                selectedGame.opponent, 
                selectedGame.playedAs
              )}
            </h3>
            <div className="text-xl text-slate-700 dark:text-slate-200">
              {selectedGame.timeControl || 'Standard Time'}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {getResultBadge(selectedGame.result)}
            {selectedGame.playedAs && (
              <span className="capitalize text-lg px-4 py-2 text-slate-800 dark:text-slate-100">
                {selectedGame.playedAs}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <ChessGameEmbed 
          gameId={selectedGame.chessComId}
          title={`${selectedGame.round || 'Game'}: ${formatMatchup(
            selectedGame.playerName, 
            selectedGame.opponent, 
            selectedGame.playedAs
          )} (${selectedGame.timeControl || 'Standard Time'})`}
        />
      </div>
    </div>
  );
};

export default GameView;