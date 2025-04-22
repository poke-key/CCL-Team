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
}

interface TeamMember {
  name: string;
  games: Game[];
}

const GamesPage: React.FC = () => {
  // Team member data with Chess.com embed IDs
  const [teamMembers] = useState<TeamMember[]>([
    {
      name: "Kunal Shrivastav",
      games: [
        { 
          id: 1, 
          opponent: "Chess_nut_Tree", 
          result: "win", 
          date: "2025-04-05",
          chessComId: "13139518",
          round: "Round 1",
          timeControl: "5+2"
        },
        { 
          id: 2, 
          opponent: "Chyessirree", 
          result: "loss", 
          date: "2025-04-05",
          chessComId: "13139626",
          round: "Round 2",
          timeControl: "5+2"
        },
        { 
          id: 3, 
          opponent: "lasdw", 
          result: "win", 
          date: "2025-04-05",
          chessComId: "13139646",
          round: "Round 3",
          timeControl: "5+2"
        },
        { 
          id: 4, 
          opponent: "ComingForCM", 
          result: "win", 
          date: "2025-04-05",
          chessComId: "13139654",
          round: "Round 4",
          timeControl: "5+2"
        },
        { 
          id: 5, 
          opponent: "ComingForCM", 
          result: "win", 
          date: "2025-04-05",
          chessComId: "13139656",
          round: "Round 5",
          timeControl: "3+2"
        },
        { 
          id: 6, 
          opponent: "ComingForCM", 
          result: "win", 
          date: "2025-04-05",
          chessComId: "13139662",
          round: "Round 6 (Final)",
          timeControl: "1+2"
        }
      ]
    },
    {
      name: "Maanas Kollegal",
      games: [
        { id: 1, opponent: "USC", result: "win", date: "2025-02-18" },
        { id: 2, opponent: "Berkeley", result: "loss", date: "2025-03-22" }
      ]
    },
    {
      name: "Vedh Vasu",
      games: [
        { id: 1, opponent: "UCSD", result: "win", date: "2025-02-25" },
        { id: 2, opponent: "Columbia University", result: "win", date: "2025-03-15" }
      ]
    },
    {
      name: "Falak Tulsi",
      games: [
        { id: 1, opponent: "NYU", result: "draw", date: "2025-02-08" },
        { id: 2, opponent: "MIT", result: "loss", date: "2025-03-30" }
      ]
    }
  ]);

  const [selectedMember, setSelectedMember] = useState<string>("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  
  // Get the selected member's games
  const selectedGames = teamMembers.find(member => member.name === selectedMember)?.games || [];

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
            
            {/* Player Selection Dropdown */}
            <div className="mb-6">
              <label htmlFor="memberSelect" className="block text-gray-700 mb-2">Select Team Member:</label>
              <select 
                id="memberSelect"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedMember}
                onChange={(e) => {
                  setSelectedMember(e.target.value);
                  setSelectedGame(null);
                }}
              >
                <option value="">-- Select a team member --</option>
                {teamMembers.map((member) => (
                  <option key={member.name} value={member.name}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Display Games */}
            {selectedMember && (
              <div>
                <h4 className="text-xl font-medium text-gray-800 mb-3">
                  {selectedMember}'s Games
                </h4>
                
                {selectedGames.length > 0 ? (
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="py-2 px-4 border-b text-left">Opponent</th>
                          <th className="py-2 px-4 border-b text-left">Round</th>
                          <th className="py-2 px-4 border-b text-left">Time Control</th>
                          <th className="py-2 px-4 border-b text-left">Result</th>
                          <th className="py-2 px-4 border-b text-left">Date</th>
                          <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedGames.map((game) => (
                          <tr key={game.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{game.opponent}</td>
                            <td className="py-2 px-4 border-b">{game.round || `Game ${game.id}`}</td>
                            <td className="py-2 px-4 border-b">{game.timeControl || "-"}</td>
                            <td className="py-2 px-4 border-b">
                              <span className={
                                game.result === 'win' ? 'text-green-600 font-medium' : 
                                game.result === 'loss' ? 'text-red-600' : 'text-yellow-600'
                              }>
                                {game.result.charAt(0).toUpperCase() + game.result.slice(1)}
                              </span>
                            </td>
                            <td className="py-2 px-4 border-b">
                              {new Date(game.date).toLocaleDateString()}
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
                  <p className="text-gray-600">No games recorded for this player.</p>
                )}
                
                {/* Chess Board Display with Chess.com Embed */}
                {selectedGame && selectedGame.chessComId && (
                  <div className="mt-8 border-t pt-6">
                    <ChessGameEmbed 
                      gameId={selectedGame.chessComId}
                      title={`${selectedGame.round || 'Game'}: ${selectedMember} vs ${selectedGame.opponent} (${selectedGame.timeControl || 'Standard Time'})`}
                    />
                  </div>
                )}
              </div>
            )}
            
            {!selectedMember && (
              <p className="text-gray-600 text-center italic">
                Select a team member to view their games
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