import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChessTeamLandingPage from './components/ChessTeamLandingPage';
import GamesPage from './components/GamesPage';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
//import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
//import { Container } from './components/ui/container';
import { Badge } from './components/ui/badge';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          {/* Navigation Header */}
          <nav className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">♔</div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      UCR Chess
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 text-sm font-medium">
                    Spring 2025
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Link to="/" className="no-underline">
                    <Button variant="ghost" className="text-white hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-white dark:hover:text-white px-4 py-2 text-base font-medium">
                      Home
                    </Button>
                  </Link>
                  <Link to="/games" className="no-underline">
                    <Button variant="ghost" className="text-white hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-white dark:hover:text-white px-4 py-2 text-base font-medium">
                      Games
                    </Button>
                  </Link>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<ChessTeamLandingPage />} />
              <Route path="/games" element={<GamesPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
