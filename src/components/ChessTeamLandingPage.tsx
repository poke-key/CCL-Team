import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Container } from './ui/container';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

const ChessTeamLandingPage = () => {
  const [teamMembers] = useState([
    "Kunal Shrivastav",
    "Maanas Kollegal",
    "Vedh Vasu",
    "Falak Tulsi"
  ]);

  return (
    <Container className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full shadow-2xl border-2 border-blue-200 dark:border-blue-800">
        <CardHeader className="bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-800 dark:to-indigo-900 text-white text-center">
          <CardTitle className="text-4xl font-bold mb-3">♔ UCR Collegiate Chess League</CardTitle>
          <div className="text-xl opacity-90 mb-2">University of California, Riverside</div>
          <Badge variant="secondary" className="bg-blue-600 text-blue-100 dark:bg-blue-700 dark:text-blue-200 text-sm">
            Spring 2025 Season
          </Badge>
        </CardHeader>
        <CardContent className="p-8">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Representing UCR in Collegiate Chess Competitions
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Our team competes in prestigious collegiate chess tournaments across the nation, 
              showcasing strategic excellence and academic achievement.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Our Team</h3>
              <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <Card key={index} className="border-2 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <Avatar className="h-12 w-12 bg-blue-100 dark:bg-blue-900">
                      <AvatarFallback className="text-blue-600 dark:text-blue-400 font-semibold">
                        {member.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                        {member}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Chess Team Member
                      </div>
                    </div>
                    <Badge variant="outline" className="border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400">
                      Active
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 dark:bg-gray-800 text-center text-gray-600 dark:text-gray-400 border-t">
          <div className="w-full text-center">
            <div className="text-sm">
              © {new Date().getFullYear()} UCR Collegiate Chess League
            </div>
            <div className="text-xs mt-1 opacity-75">
              Powered by strategic excellence and academic achievement
            </div>
          </div>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default ChessTeamLandingPage;