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
  // Use standard HTML select element for better dark theme compatibility
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlayer(e.target.value);
    setSelectedGame(null);
  };

  return (
    <div className="mb-4">
      <label htmlFor="playerSelect" className="block text-white mb-2">
        Select a player:
      </label>
      <select
        id="playerSelect"
        className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedPlayer}
        onChange={handleChange}
      >
        <option value="">-- Select a player --</option>
        {playerNames.map(name => (
          <option 
            key={name} 
            value={name}
            className="bg-gray-800 text-white"
          >
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlayerSelector;