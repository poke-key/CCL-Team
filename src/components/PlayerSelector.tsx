// PlayerSelector.tsx
import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';

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
  const onChange = (value: string) => {
    setSelectedPlayer(value);
    setSelectedGame(null);
  };

  return (
    <div className="mb-4">
      <label className="block text-white mb-2">
        Select a player:
      </label>
      <div className="relative">
        <Select value={selectedPlayer} onValueChange={onChange}>
          <SelectTrigger
            className="w-full border border-gray-600 bg-gray-700 text-white rounded shadow-none"
            style={{ 
              backgroundColor: '#374151', // bg-gray-700 equivalent 
              borderColor: '#4B5563',    // border-gray-600 equivalent
              color: 'white'
            }}
          >
            <SelectValue placeholder="-- Select a player --" />
          </SelectTrigger>
          <SelectContent
            className="border border-gray-600 rounded shadow-md"
            style={{ 
              backgroundColor: '#374151', // bg-gray-700 equivalent 
              borderColor: '#4B5563',     // border-gray-600 equivalent
              color: 'white'
            }}
          >
            <div className="bg-gray-700 border-none">
              {playerNames.map(name => (
                <SelectItem 
                  key={name} 
                  value={name}
                  className="text-white focus:bg-blue-500 hover:bg-blue-500"
                  style={{ 
                    color: 'white',
                    backgroundColor: '#374151', // bg-gray-700 equivalent
                  }}
                >
                  {name}
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PlayerSelector;