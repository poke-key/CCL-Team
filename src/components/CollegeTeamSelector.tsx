// CollegeTeamSelector.tsx
import React from 'react';
import { CollegeTeam } from './types';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';

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
    <Card className="mb-6 border-2 border-dashed border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
      <CardContent className="p-6">
        <Label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Select Opponent College Team
        </Label>
        <Select value={selectedCollegeTeam} onValueChange={onChange}>
          <SelectTrigger className="w-full h-12 text-lg bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
            <SelectValue placeholder="Choose a college team to analyze..." />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700">
            {collegeTeams.map(team => (
              <SelectItem 
                key={team.id} 
                value={team.id}
                className="text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 focus:bg-blue-100 dark:focus:bg-blue-900 cursor-pointer"
              >
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default CollegeTeamSelector;