// GamesPage.tsx
import React, { useState } from 'react';
import { Game } from './types';
import { collegeTeams, allGames } from './gameData';
import CollegeTeamSelector from './CollegeTeamSelector';
import PlayerSelector from './PlayerSelector';
import MatchSummary from './MatchSummary';
import GamesList from './GamesList';
import GameView from './GameView';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Container } from './ui/container';

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
    <Container className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="max-w-6xl w-full shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-900 dark:to-blue-950 text-white text-center">
          <CardTitle className="text-4xl font-bold mb-2">UCR Collegiate Chess League</CardTitle>
          <div className="text-xl opacity-90">Games & Match Analysis</div>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
              Spring 2025 Season Games
            </h3>
            
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
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {selectedTeamName} Match
                  </h4>
                  <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>
                
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
                  <div className="text-center py-8">
                    <div className="text-gray-400 dark:text-gray-500 text-lg">
                      Select a player to view their games
                    </div>
                  </div>
                )}
                
                {/* Chess Board Display with Chess.com Embed */}
                <GameView selectedGame={selectedGame} />
              </div>
            )}
            
            {!selectedCollegeTeam && (
              <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400 text-lg">
                  Select a college team to view games
                </div>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50 dark:bg-gray-800 text-center text-gray-600 dark:text-gray-400 border-t">
          <div className="w-full text-center">
            © {new Date().getFullYear()} UCR Collegiate Chess League
          </div>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default GamesPage;