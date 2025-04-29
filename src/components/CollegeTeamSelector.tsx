// CollegeTeamSelector.tsx
import { CollegeTeam } from './types';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
//never used SelectLabel

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
      <Select value={selectedCollegeTeam} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a college team" />
        </SelectTrigger>
        <SelectContent>
          {collegeTeams.map(team => (
            <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CollegeTeamSelector;