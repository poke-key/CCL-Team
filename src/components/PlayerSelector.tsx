// PlayerSelector.tsx
import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { Label } from './ui/label';

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
    <div className="space-y-6">
      <div className="text-center">
        <Label className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 block">
          Select a Player
        </Label>
        <p className="text-lg text-slate-700 dark:text-slate-200">
          Choose a player to view their individual game performance
        </p>
      </div>
      
      <Select value={selectedPlayer} onValueChange={onChange}>
        <SelectTrigger className="w-full h-16 text-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <SelectValue placeholder="Choose a player to view their games..." className="text-slate-600 dark:text-slate-300" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 max-h-96">
          {playerNames.map(name => (
            <SelectItem 
              key={name} 
              value={name}
              className="text-lg text-slate-900 dark:text-slate-100 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 focus:bg-indigo-100 dark:focus:bg-indigo-900 cursor-pointer py-3"
            >
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PlayerSelector;