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
      <Select value={selectedPlayer} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a player" />
        </SelectTrigger>
        <SelectContent>
          {playerNames.map(name => (
            <SelectItem key={name} value={name}>{name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PlayerSelector;