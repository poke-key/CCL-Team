// CollegeTeamSelector.tsx
import React from 'react';
import { CollegeTeam } from './types';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { Label } from './ui/label';
import { useTheme } from './ThemeProvider';

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
  const { theme } = useTheme();

  const onChange = (value: string) => {
    setSelectedCollegeTeam(value);
    setSelectedPlayer("");
    setSelectedGame(null);
  };

  const isDarkMode =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const contentStyle = {
    backgroundColor: isDarkMode ? '#1e293b' : 'white',
    border: '2px solid',
    borderColor: isDarkMode ? '#475569' : '#cbd5e1',
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
        <SelectTrigger className="w-full h-16 text-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-100">
          <SelectValue placeholder="Choose a college team to analyze..." className="text-slate-600 dark:text-white" />
        </SelectTrigger>
        <SelectContent style={contentStyle} className="max-h-96">
          {collegeTeams.map(team => (
            <SelectItem
              key={team.id}
              value={team.id}
              className="text-lg text-slate-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/50 focus:bg-blue-100 dark:focus:bg-blue-900 cursor-pointer py-3 transition-all duration-200 ease-in-out hover:pl-4 transform"
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