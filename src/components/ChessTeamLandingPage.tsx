import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Container } from './ui/container';

const ChessTeamLandingPage = () => {
  const [teamMembers] = useState([
    "Kunal Shrivastav",
    "Maanas Kollegal",
    "Vedh Vasu",
    "Falak Tulsi"
  ]);

  return (
    <Container className="min-h-screen bg-blue-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="bg-blue-800 dark:bg-blue-900 text-white text-center">
          <CardTitle className="text-3xl">UCR Collegiate Chess League</CardTitle>
          <div className="text-xl mt-1">University of California, Riverside</div>
        </CardHeader>
        <CardContent>
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Spring 2025 Season</h3>
            <p className="text-gray-600 dark:text-gray-400">Representing UCR in collegiate chess competitions across the nation</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">Our Team</h3>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {teamMembers.map((member, index) => (
                <li key={index} className="py-3 text-center text-gray-700 dark:text-gray-300">{member}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-100 dark:bg-gray-900 text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} UCR Collegiate Chess League
        </CardFooter>
      </Card>
    </Container>
  );
};

export default ChessTeamLandingPage;