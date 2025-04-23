// CollegeTeamSelector.tsx
import React from 'react';
import { CollegeTeam } from './types';

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
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollegeTeam(e.target.value);
    setSelectedPlayer("");
    setSelectedGame(null);
  };

  return (
    <div className="mb-6">
      <label htmlFor="collegeSelect" className="block text-gray-700 mb-2">
        Select Opponent College Team:
      </label>
      <select 
        id="collegeSelect"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedCollegeTeam}
        onChange={handleChange}
      >
        <option value="">-- Select a college team --</option>
        {collegeTeams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CollegeTeamSelector;