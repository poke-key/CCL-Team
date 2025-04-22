import React, { useState } from 'react';
import ChessGameEmbed from './ChessGameEmbed';

interface Game {
  id: number;
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  date: string;
  chessComId?: string; // Chess.com embed ID
  round?: string;
  timeControl?: string;
  playedAs?: 'white' | 'black';
  notes?: string;
  collegeTeam: string;
  playerName: string;
}

interface TeamMember {
  name: string;
  games: Game[];
}

interface CollegeTeam {
  name: string;
  id: string;
}

const GamesPage: React.FC = () => {
  // College teams we played against
  const collegeTeams: CollegeTeam[] = [
    { name: "CCL UWATERLOO TEAM B W25", id: "uwaterloo-b" },
    { name: "University of Washington-B", id: "washington-b" },
    { name: "VIT I 2025 (INT CCL)", id: "vit-i" },
    { name: "University of Texas at Austin - D", id: "texas-austin-d" },
    { name: "UNIZAMBEZEA A", id: "unizambezea-a" },
  ];

  // Team member data with Chess.com embed IDs
  const allGames: Game[] = [
    // Kunal vs UWATERLOO TEAM B
    { 
      id: 1, 
      opponent: "Chess_nut_Tree", 
      result: "win", 
      date: "2025-04-05",
      chessComId: "13139518",
      round: "Round 1",
      timeControl: "5+2",
      playedAs: "black",
      collegeTeam: "uwaterloo-b",
      playerName: "Kunal Shrivastav"
    },
    { 
      id: 2, 
      opponent: "Chyessirree", 
      result: "loss", 
      date: "2025-04-05",
      chessComId: "13139626",
      round: "Round 2",
      timeControl: "5+2",
      playedAs: "black",
      collegeTeam: "uwaterloo-b",
      playerName: "Kunal Shrivastav"
    },
    { 
      id: 3, 
      opponent: "lasdw", 
      result: "win", 
      date: "2025-04-05",
      chessComId: "13139646",
      round: "Round 3",
      timeControl: "5+2",
      playedAs: "black",
      collegeTeam: "uwaterloo-b",
      playerName: "Kunal Shrivastav"
    },
    { 
      id: 4, 
      opponent: "ComingForCM", 
      result: "win", 
      date: "2025-04-05",
      chessComId: "13139654",
      round: "Round 4",
      timeControl: "5+2",
      playedAs: "white",
      collegeTeam: "uwaterloo-b",
      playerName: "Kunal Shrivastav"
    },
    { 
      id: 5, 
      opponent: "ComingForCM", 
      result: "win", 
      date: "2025-04-05",
      chessComId: "13139656",
      round: "Round 5",
      timeControl: "3+2",
      playedAs: "black",
      collegeTeam: "uwaterloo-b",
      playerName: "Kunal Shrivastav"
    },
    { 
      id: 6, 
      opponent: "ComingForCM", 
      result: "win", 
      date: "2025-04-05",
      chessComId: "13139662",
      round: "Round 6 (Final)",
      timeControl: "1+2",
      playedAs: "white",
      collegeTeam: "uwaterloo-b",
      playerName: "Kunal Shrivastav"
    },
    
    // Vedh vs UWATERLOO TEAM B
    {
      id: 7,
      opponent: "lasdw",
      result: "win",
      date: "2025-04-05",
      chessComId: "13139798",
      round: "Round 1",
      timeControl: "5+2",
      playedAs: "white",
      collegeTeam: "uwaterloo-b",
      playerName: "Vedh Vasu"
    },
    {
      id: 8,
      opponent: "ComingForCM",
      result: "loss",
      date: "2025-04-05",
      chessComId: "13139802",
      round: "Round 2",
      timeControl: "5+2",
      playedAs: "black",
      collegeTeam: "uwaterloo-b",
      playerName: "Vedh Vasu"
    },
    {
      id: 9,
      opponent: "Chess_nut_Tree",
      result: "win",
      date: "2025-04-05",
      chessComId: "13139810",
      round: "Round 3",
      timeControl: "5+2",
      playedAs: "white",
      collegeTeam: "uwaterloo-b",
      playerName: "Vedh Vasu"
    },
    {
      id: 10,
      opponent: "Chyessirree",
      result: "win",
      date: "2025-04-05",
      chessComId: "13139814",
      round: "Round 4",
      timeControl: "5+2",
      playedAs: "black",
      collegeTeam: "uwaterloo-b",
      playerName: "Vedh Vasu"
    },
    {
      id: 11,
      opponent: "Chyessirree",
      result: "loss",
      date: "2025-04-05",
      chessComId: "13139828",
      round: "Round 5",
      timeControl: "3+2",
      playedAs: "white",
      collegeTeam: "uwaterloo-b",
      playerName: "Vedh Vasu"
    },
    {
      id: 12,
      opponent: "Chyessirree",
      result: "win",
      date: "2025-04-05",
      chessComId: "13139830",
      round: "Round 6 (Final)",
      timeControl: "1+2",
      playedAs: "black",
      collegeTeam: "uwaterloo-b",
      playerName: "Vedh Vasu"
    },
    
    // Falak vs UWATERLOO TEAM B
    {
      id: 13,
      opponent: "ComingForCM",
      result: "loss",
      date: "2025-04-05",
      chessComId: "13139882",
      round: "Round 1",
      timeControl: "5+2",
      playedAs: "white",
      notes: "Player username: skizzers13",
      collegeTeam: "uwaterloo-b",
      playerName: "Falak Tulsi"
    },
    {
      id: 14,
      opponent: "lasdw",
      result: "loss",
      date: "2025-04-05",
      chessComId: "13139884",
      round: "Round 2",
      timeControl: "5+2",
      playedAs: "black",
      notes: "Player username: skizzers13",
      collegeTeam: "uwaterloo-b",
      playerName: "Falak Tulsi"
    },
    {
      id: 15,
      opponent: "N/A",
      result: "draw",
      date: "2025-04-05",
      round: "Round 3",
      timeControl: "N/A",
      notes: "Player did not participate",
      collegeTeam: "uwaterloo-b",
      playerName: "Falak Tulsi"
    },
    {
      id: 16,
      opponent: "N/A",
      result: "draw",
      date: "2025-04-05",
      round: "Round 4",
      timeControl: "N/A",
      notes: "Player did not participate",
      collegeTeam: "uwaterloo-b",
      playerName: "Falak Tulsi"
    },
    {
      id: 17,
      opponent: "N/A",
      result: "draw",
      date: "2025-04-05",
      round: "Round 5",
      timeControl: "N/A",
      notes: "Player did not participate",
      collegeTeam: "uwaterloo-b",
      playerName: "Falak Tulsi"
    },
    {
      id: 18,
      opponent: "N/A",
      result: "draw",
      date: "2025-04-05",
      round: "Round 6",
      timeControl: "N/A",
      notes: "Player did not participate",
      collegeTeam: "uwaterloo-b",
      playerName: "Falak Tulsi"
    }
  ];

  const [selectedCollegeTeam, setSelectedCollegeTeam] = useState<string>("");
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  
  // Get games for the selected college team
  const collegeTeamGames = selectedCollegeTeam 
    ? allGames.filter(game => game.collegeTeam === selectedCollegeTeam)
    : [];
  
  // Get unique player names for the selected college team  
  const playerNames = [...new Set(collegeTeamGames.map(game => game.playerName))];
  
  // Get games for the selected player
  const playerGames = selectedPlayer 
    ? collegeTeamGames.filter(game => game.playerName === selectedPlayer)
    : collegeTeamGames;

  // Function to format player names based on who played as white/black
  const formatMatchup = (playerName: string, opponentName: string, playedAs?: 'white' | 'black') => {
    if (playedAs === 'white') {
      return `${playerName} vs ${opponentName}`;
    } else if (playedAs === 'black') {
      return `${opponentName} vs ${playerName}`;
    }
    return `${playerName} vs ${opponentName}`;
  };

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
            <div className="mb-6">
              <label htmlFor="collegeSelect" className="block text-gray-700 mb-2">Select Opponent College Team:</label>
              <select 
                id="collegeSelect"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCollegeTeam}
                onChange={(e) => {
                  setSelectedCollegeTeam(e.target.value);
                  setSelectedPlayer("");
                  setSelectedGame(null);
                }}
              >
                <option value="">-- Select a college team --</option>
                {collegeTeams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Display College Team Games Section */}
            {selectedCollegeTeam && (
              <div>
                <h4 className="text-xl font-medium text-gray-800 mb-3">
                  {collegeTeams.find(team => team.id === selectedCollegeTeam)?.name} Match
                </h4>
                
                {/* Player Filter Dropdown (optional) */}
                <div className="mb-4">
                  <label htmlFor="playerSelect" className="block text-gray-700 mb-2">Filter by Player:</label>
                  <select 
                    id="playerSelect"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedPlayer}
                    onChange={(e) => {
                      setSelectedPlayer(e.target.value);
                      setSelectedGame(null);
                    }}
                  >
                    <option value="">-- All Players --</option>
                    {playerNames.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Display Games Table */}
                {playerGames.length > 0 ? (
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="py-2 px-4 border-b text-left">Player</th>
                          <th className="py-2 px-4 border-b text-left">Opponent</th>
                          <th className="py-2 px-4 border-b text-left">Round</th>
                          <th className="py-2 px-4 border-b text-left">Time Control</th>
                          <th className="py-2 px-4 border-b text-left">Played As</th>
                          <th className="py-2 px-4 border-b text-left">Result</th>
                          <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {playerGames.map((game) => (
                          <tr key={game.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{game.playerName}</td>
                            <td className="py-2 px-4 border-b">{game.opponent}</td>
                            <td className="py-2 px-4 border-b">{game.round || `Game ${game.id}`}</td>
                            <td className="py-2 px-4 border-b">{game.timeControl || "-"}</td>
                            <td className="py-2 px-4 border-b">{game.playedAs ? game.playedAs.charAt(0).toUpperCase() + game.playedAs.slice(1) : "-"}</td>
                            <td className="py-2 px-4 border-b">
                              <span className={
                                game.result === 'win' ? 'text-green-600 font-medium' : 
                                game.result === 'loss' ? 'text-red-600' : 
                                'text-yellow-600'
                              }>
                                {game.result.charAt(0).toUpperCase() + game.result.slice(1)}
                              </span>
                            </td>
                            <td className="py-2 px-4 border-b">
                              {game.chessComId ? (
                                <button 
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                  onClick={() => setSelectedGame(game)}
                                >
                                  View Game
                                </button>
                              ) : (
                                <span className="text-gray-400 text-sm">No game available</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-600">No games recorded for this selection.</p>
                )}
                
                {/* Chess Board Display with Chess.com Embed */}
                {selectedGame && selectedGame.chessComId && (
                  <div className="mt-8 border-t pt-6">
                    <ChessGameEmbed 
                      gameId={selectedGame.chessComId}
                      title={`${selectedGame.round || 'Game'}: ${formatMatchup(selectedGame.playerName, selectedGame.opponent, selectedGame.playedAs)} (${selectedGame.timeControl || 'Standard Time'})`}
                    />
                  </div>
                )}
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