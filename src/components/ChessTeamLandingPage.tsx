//import { useState } from 'react';
//import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
//import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';

const ChessTeamLandingPage = () => {
  const teamMembers = [
    { name: "Kunal Shrivastav", initials: "KS" },
    { name: "Maanas Kollegal", initials: "MK" },
    { name: "Vedh Vasu", initials: "VV" },
    { name: "Falak Tulsi", initials: "FT" }
  ];

  const stats = [
    { value: "15+", label: "Tournaments" },
    { value: "4", label: "Team Members" },
    { value: "100+", label: "Games Played" }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">
          Representing UCR in Collegiate Chess Competitions
        </h1>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-12">
          Our team competes in prestigious collegiate chess tournaments across the nation, showcasing strategic excellence and academic achievement. We bring together the brightest minds to represent UCR on the national stage.
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
          Meet Our Team
        </h2>
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
          Our dedicated players bring diverse strategies and unwavering determination to every match
        </p>
        
        <div className="">
          {teamMembers.map((member) => (
            <div key={member.name} className="py-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">{member.initials}</p>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{member.name}</h3>
              <p className="text-slate-600 dark:text-slate-300">Chess Team Member</p>
              <Badge variant="outline" className="mt-2">Active Player</Badge>
            </div>
          ))}
        </div>

        <div className="mt-12">
          {stats.map((stat) => (
            <div key={stat.label} className="py-4">
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
              <p className="text-slate-600 dark:text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Ready to See Our Games?
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
            Explore our match history and analyze our strategic gameplay
          </p>
          <Button 
            size="lg" 
            onClick={() => window.location.href = '/games'}
          >
            View Games →
          </Button>
        </div>

      </div>
      <footer className="mt-20 text-center text-slate-700 dark:text-slate-400">
        <p>© {new Date().getFullYear()} UCR Collegiate Chess League</p>
        <p className="text-sm">Powered by strategic excellence and academic achievement</p>
      </footer>
    </div>
  );
};

export default ChessTeamLandingPage;