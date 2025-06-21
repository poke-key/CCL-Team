import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const ChessTeamLandingPage = () => {
  const [teamMembers] = useState([
    "Kunal Shrivastav",
    "Maanas Kollegal",
    "Vedh Vasu",
    "Falak Tulsi"
  ]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="text-8xl mb-6">♔</div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              UCR Collegiate Chess League
            </h1>
            <p className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-medium mb-4">
              University of California, Riverside
            </p>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-6 py-2 text-lg font-semibold">
              Spring 2025 Season
            </Badge>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-8">
              Representing UCR in Collegiate Chess Competitions
            </h2>
            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed">
              Our team competes in prestigious collegiate chess tournaments across the nation, 
              showcasing strategic excellence and academic achievement. We bring together 
              the brightest minds to represent UCR on the national stage.
            </p>
          </div>
        </div>

        <Separator className="my-16" />

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-700 dark:text-slate-200 max-w-2xl mx-auto">
              Our dedicated players bring diverse strategies and unwavering determination to every match
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-slate-200 dark:border-slate-700">
                <CardContent className="p-8 text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 group-hover:scale-110 transition-transform duration-300">
                    <AvatarFallback className="text-blue-600 dark:text-blue-400 font-bold text-xl">
                      {member.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                    {member}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-200 text-lg mb-4">
                    Chess Team Member
                  </p>
                  <Badge variant="outline" className="border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 px-4 py-2 text-sm font-medium">
                    Active Player
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-16" />

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-8 border-2 border-slate-200 dark:border-slate-700">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">15+</div>
            <div className="text-xl text-slate-800 dark:text-slate-100">Tournaments</div>
          </Card>
          <Card className="text-center p-8 border-2 border-slate-200 dark:border-slate-700">
            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">4</div>
            <div className="text-xl text-slate-800 dark:text-slate-100">Team Members</div>
          </Card>
          <Card className="text-center p-8 border-2 border-slate-200 dark:border-slate-700">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">100+</div>
            <div className="text-xl text-slate-800 dark:text-slate-100">Games Played</div>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white text-center p-12">
          <CardContent className="p-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to See Our Games?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Explore our match history and analyze our strategic gameplay
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-4 text-lg font-semibold"
              onClick={() => window.location.href = '/games'}
            >
              View Games →
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-slate-700 dark:text-slate-200">
        <div className="text-lg mb-2">
          © {new Date().getFullYear()} UCR Collegiate Chess League
        </div>
        <div className="text-base opacity-75">
          Powered by strategic excellence and academic achievement
        </div>
      </footer>
    </div>
  );
};

export default ChessTeamLandingPage;