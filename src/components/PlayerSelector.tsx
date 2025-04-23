// PlayerSelector.tsx
import React from 'react';

interface PlayerSelectorProps {
  playerNames: string[];
  selectedPlayer: string;
  setSelectedPlayer: (name: string) => void;
  setSelectedGame: (game: any) => void;
}

const PlayerSelector: React.FC<PlayerSelectorProps> = ({
  playerNames,
  selectedPlayer,
  setSelectedPlayer,
  setSelectedGame
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlayer(e.target.value);
    setSelectedGame(null);
  };

  return (
    <div className="mb-4">
      <label htmlFor="playerSelect" className="block text-gray-700 mb-2">
        Filter by Player:
      </label>
      <select 
        id="playerSelect"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedPlayer}
        onChange={handleChange}
      >
        <option value="">-- All Players --</option>
        {playerNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlayerSelector;