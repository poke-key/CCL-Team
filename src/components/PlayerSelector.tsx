// PlayerSelector.tsx
import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';

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
    <Card className="mb-6 border-2 border-dashed border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
      <CardContent className="p-6">
        <Label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Select a Player
        </Label>
        <Select value={selectedPlayer} onValueChange={onChange}>
          <SelectTrigger className="w-full h-12 text-lg bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600 transition-colors">
            <SelectValue placeholder="Choose a player to view their games..." />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-700">
            {playerNames.map(name => (
              <SelectItem 
                key={name} 
                value={name}
                className="text-gray-800 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900/50 focus:bg-green-100 dark:focus:bg-green-900 cursor-pointer"
              >
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default PlayerSelector;