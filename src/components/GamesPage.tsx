// GamesPage.tsx
import React, { useState } from 'react';
import { Game } from './types';
import { collegeTeams, allGames } from './gameData';
import CollegeTeamSelector from './CollegeTeamSelector';
import PlayerSelector from './PlayerSelector';
import MatchSummary from './MatchSummary';
import GamesList from './GamesList';
import GameView from './GameView';

const GamesPage: React.FC = () => {
  const [selectedCollegeTeam, setSelectedCollegeTeam] = useState<string>("");
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  
  // Get games for the selected college team
  const collegeTeamGames = selectedCollegeTeam 
    ? allGames.filter(game => game.collegeTeam === selectedCollegeTeam)
    : [];
  
  // Get unique player names for the selected college team  
  const playerNames = [...new Set(collegeTeamGames.map(game => game.playerName))].sort();
  
  // Get games for the selected player
  const playerGames = selectedPlayer 
    ? collegeTeamGames.filter(game => game.playerName === selectedPlayer)
    : [];

  // Get the selected college team name
  const selectedTeamName = selectedCollegeTeam 
    ? collegeTeams.find(team => team.id === selectedCollegeTeam)?.name
    : "";

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="bg-blue-800 p-6 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">UCR Collegiate Chess League</h1>
          <h2 className="text-xl">Games</h2>
        </header>
        
        <main className="p-6">
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Spring 2025 Season Games</h3>
            
            {/* College Team Selection Dropdown */}
            <CollegeTeamSelector
              collegeTeams={collegeTeams}
              selectedCollegeTeam={selectedCollegeTeam}
              setSelectedCollegeTeam={setSelectedCollegeTeam}
              setSelectedPlayer={setSelectedPlayer}
              setSelectedGame={setSelectedGame}
            />
            
            {/* Display College Team Games Section */}
            {selectedCollegeTeam && (
              <div>
                <h4 className="text-xl font-medium text-gray-800 mb-3">
                  {selectedTeamName} Match
                </h4>
                
                {/* Match summary statistics */}
                <MatchSummary 
                  collegeTeamGames={collegeTeamGames}
                  playerNames={playerNames}
                />
                
                {/* Player Filter Dropdown */}
                <PlayerSelector
                  playerNames={playerNames}
                  selectedPlayer={selectedPlayer}
                  setSelectedPlayer={setSelectedPlayer}
                  setSelectedGame={setSelectedGame}
                />
                
                {/* Display Games Table - only if player is selected */}
                {selectedPlayer && (
                  <GamesList 
                    games={playerGames}
                    setSelectedGame={setSelectedGame}
                  />
                )}
                
                {!selectedPlayer && (
                  <p className="text-gray-600 text-center italic my-4">
                    Select a player to view their games
                  </p>
                )}
                
                {/* Chess Board Display with Chess.com Embed */}
                <GameView selectedGame={selectedGame} />
              </div>
            )}
            
            {!selectedCollegeTeam && (
              <p className="text-gray-600 text-center italic">
                Select a college team to view games
              </p>
            )}
          </div>
        </main>
        
        <footer className="bg-gray-100 p-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} UCR Collegiate Chess League</p>
        </footer>
      </div>
    </div>
  );
};

export default GamesPage;