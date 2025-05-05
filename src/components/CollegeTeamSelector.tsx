// CollegeTeamSelector.tsx
import React from 'react';
import { CollegeTeam } from './types';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';

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
    <div className="mb-6">
      <label className="block text-white mb-2">
        Select Opponent College Team:
      </label>
      <div className="relative">
        <Select value={selectedCollegeTeam} onValueChange={onChange}>
          <SelectTrigger
            className="w-full border border-gray-600 bg-gray-700 text-white rounded shadow-none"
            style={{ 
              backgroundColor: '#374151', // bg-gray-700 equivalent 
              borderColor: '#4B5563',    // border-gray-600 equivalent
              color: 'white'
            }}
          >
            <SelectValue placeholder="-- Select a college team --" />
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
              {collegeTeams.map(team => (
                <SelectItem 
                  key={team.id} 
                  value={team.id}
                  className="text-white focus:bg-blue-500 hover:bg-blue-500"
                  style={{ 
                    color: 'white',
                    backgroundColor: '#374151', // bg-gray-700 equivalent
                  }}
                >
                  {team.name}
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CollegeTeamSelector;