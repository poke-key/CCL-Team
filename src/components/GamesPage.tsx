// GamesPage.tsx
import React, { useState } from 'react';
import { Game } from './types';
import { collegeTeams, allGames } from './gameData';
import CollegeTeamSelector from './CollegeTeamSelector';
import PlayerSelector from './PlayerSelector';
import MatchSummary from './MatchSummary';
import GamesList from './GamesList';
import GameView from './GameView';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Separator } from './ui/separator';

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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Games & Match Analysis
            </h1>
            <p className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-medium">
              Spring 2025 Season
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-8">
              Analyze Our Strategic Gameplay
            </h2>
            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed">
              Explore our match history, review game strategies, and dive deep into our 
              competitive performance across collegiate tournaments.
            </p>
          </div>
        </div>

        <Separator className="my-16" />

        {/* Main Content */}
        <div className="space-y-12">
          {/* College Team Selection */}
          <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20">
              <CardTitle className="text-3xl font-bold text-slate-900 dark:text-slate-50 text-center">
                Select a College Team
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <CollegeTeamSelector
                collegeTeams={collegeTeams}
                selectedCollegeTeam={selectedCollegeTeam}
                setSelectedCollegeTeam={setSelectedCollegeTeam}
                setSelectedPlayer={setSelectedPlayer}
                setSelectedGame={setSelectedGame}
              />
            </CardContent>
          </Card>
          
          {/* Display College Team Games Section */}
          {selectedCollegeTeam && (
            <div className="space-y-12">
              <div className="text-center">
                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">
                  {selectedTeamName} Match Analysis
                </h3>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
              </div>
              
              {/* Match summary statistics */}
              <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20">
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                    Match Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <MatchSummary 
                    collegeTeamGames={collegeTeamGames}
                    playerNames={playerNames}
                  />
                </CardContent>
              </Card>
              
              {/* Player Filter */}
              <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20">
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                    Select Player
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <PlayerSelector
                    playerNames={playerNames}
                    selectedPlayer={selectedPlayer}
                    setSelectedPlayer={setSelectedPlayer}
                    setSelectedGame={setSelectedGame}
                  />
                </CardContent>
              </Card>
              
              {/* Display Games Table - only if player is selected */}
              {selectedPlayer && (
                <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20">
                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                      {selectedPlayer}'s Games
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <GamesList 
                      games={playerGames}
                      setSelectedGame={setSelectedGame}
                    />
                  </CardContent>
                </Card>
              )}
              
              {!selectedPlayer && (
                <Card className="border-2 border-slate-200 dark:border-slate-700 text-center p-16">
                  <div className="text-2xl text-slate-600 dark:text-slate-300 font-medium">
                    Select a player to view their games
                  </div>
                </Card>
              )}
              
              {/* Chess Board Display with Chess.com Embed */}
              {selectedGame && (
                <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20">
                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                      Game Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <GameView selectedGame={selectedGame} />
                  </CardContent>
                </Card>
              )}
            </div>
          )}
          
          {!selectedCollegeTeam && (
            <Card className="border-2 border-slate-200 dark:border-slate-700 text-center p-20">
              <div className="text-3xl text-slate-600 dark:text-slate-300 font-medium mb-4">
                Select a college team to view games
              </div>
              <div className="text-xl text-slate-500 dark:text-slate-400">
                Choose from the dropdown above to explore our match history
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-slate-700 dark:text-slate-200">
        <div className="text-lg mb-2">
          © {new Date().getFullYear()} UCR Collegiate Chess League
        </div>
        <div className="text-base opacity-75">
          Strategic analysis and competitive excellence
        </div>
      </footer>
    </div>
  );
};

export default GamesPage;