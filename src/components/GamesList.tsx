// GamesList.tsx
import React from 'react';
import { Game } from './types';

interface GamesListProps {
  games: Game[];
  setSelectedGame: (game: Game | null) => void;
}

const GamesList: React.FC<GamesListProps> = ({
  games,
  setSelectedGame
}) => {
  if (games.length === 0) {
    return <p className="text-gray-600">No games recorded for this selection.</p>;
  }

  return (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">Player</th>
            <th className="py-2 px-4 border-b text-left">Opponent</th>
            <th className="py-2 px-4 border-b text-left">Round</th>
            <th className="py-2 px-4 border-b text-left">Time Control</th>
            <th className="py-2 px-4 border-b text-left">Played As</th>
            <th className="py-2 px-4 border-b text-left">Result</th>
            <th className="py-2 px-4 border-b text-left">Notes</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{game.playerName}</td>
              <td className="py-2 px-4 border-b">{game.opponent}</td>
              <td className="py-2 px-4 border-b">{game.round || `Game ${game.id}`}</td>
              <td className="py-2 px-4 border-b">{game.timeControl || "-"}</td>
              <td className="py-2 px-4 border-b">{game.playedAs ? game.playedAs.charAt(0).toUpperCase() + game.playedAs.slice(1) : "-"}</td>
              <td className="py-2 px-4 border-b">
                <span className={
                  game.result === 'win' ? 'text-green-600 font-medium' : 
                  game.result === 'loss' ? 'text-red-600' : 
                  'text-yellow-600'
                }>
                  {game.result.charAt(0).toUpperCase() + game.result.slice(1)}
                </span>
              </td>
              <td className="py-2 px-4 border-b">{game.notes || "-"}</td>
              <td className="py-2 px-4 border-b">
                {game.chessComId ? (
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    onClick={() => setSelectedGame(game)}
                  >
                    View Game
                  </button>
                ) : (
                  <span className="text-gray-400 text-sm">No game available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GamesList;