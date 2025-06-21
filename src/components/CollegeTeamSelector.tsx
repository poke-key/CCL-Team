// CollegeTeamSelector.tsx
import React from 'react';
import { CollegeTeam } from './types';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { Label } from './ui/label';

interface CollegeTeamSelectorProps {
  collegeTeams: CollegeTeam[];
  selectedCollegeTeam: string;
  setSelectedCollegeTeam: (id: string) => void;
  setSelectedPlayer: (name: string) => void;
  setSelectedGame: (game: any) => void;
}

const CollegeTeamSelector: React.FC<CollegeTeamSelectorProps> = ({
  collegeTeams,
  selectedCollegeTeam,
  setSelectedCollegeTeam,
  setSelectedPlayer,
  setSelectedGame
}) => {
  const onChange = (value: string) => {
    setSelectedCollegeTeam(value);
    setSelectedPlayer("");
    setSelectedGame(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Label className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 block">
          Select Opponent College Team
        </Label>
        <p className="text-lg text-slate-700 dark:text-slate-200">
          Choose a team to analyze our match performance
        </p>
      </div>
      
      <Select value={selectedCollegeTeam} onValueChange={onChange}>
        <SelectTrigger className="w-full h-16 text-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <SelectValue placeholder="Choose a college team to analyze..." className="text-slate-600 dark:text-slate-300" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 max-h-96">
          {collegeTeams.map(team => (
            <SelectItem 
              key={team.id} 
              value={team.id}
              className="text-lg text-slate-900 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-blue-900/50 focus:bg-blue-100 dark:focus:bg-blue-900 cursor-pointer py-3"
            >
              {team.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CollegeTeamSelector;