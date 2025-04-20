import { useState } from 'react';

const ChessTeamLandingPage = () => {
  const [teamMembers] = useState([
    "Kunal Shrivastav",
    "Maanas Kollegal",
    "Vedh Vasu",
    "Falak Tulsi"
  ]);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="bg-blue-800 p-6 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">UCR Collegiate Chess League</h1>
          <h2 className="text-xl">University of California, Riverside</h2>
        </header>
        
        <main className="p-6">
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Spring 2025 Season</h3>
            <p className="text-gray-600 text-center">Representing UCR in collegiate chess competitions across the nation</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Our Team</h3>
            <ul className="divide-y divide-gray-200">
              {teamMembers.map((member, index) => (
                <li key={index} className="py-3 text-center text-gray-700">{member}</li>
              ))}
            </ul>
          </div>
        </main>
        
        <footer className="bg-gray-100 p-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} UCR Collegiate Chess League</p>
        </footer>
      </div>
    </div>
  );
};

export default ChessTeamLandingPage;