import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChessTeamLandingPage from './components/ChessTeamLandingPage';
import GamesPage from './components/GamesPage';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Container } from './components/ui/container';
import { Badge } from './components/ui/badge';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Router>
        <Container className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-0">
          <Card className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 dark:from-blue-950 dark:via-blue-900 dark:to-indigo-950 text-white rounded-none shadow-lg border-0">
            <CardContent className="max-w-7xl mx-auto flex justify-between items-center p-6">
              <div className="flex items-center space-x-3">
                <div className="text-2xl font-bold">♔ UCR Chess</div>
                <Badge variant="secondary" className="bg-blue-700 text-blue-100 dark:bg-blue-800 dark:text-blue-200">
                  Spring 2025
                </Badge>
              </div>
              <div className="flex items-center space-x-6">
                <Link to="/" className="no-underline">
                  <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-white">
                    Home
                  </Button>
                </Link>
                <Link to="/games" className="no-underline">
                  <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-white">
                    Games
                  </Button>
                </Link>
                <ThemeToggle />
              </div>
            </CardContent>
          </Card>

          <Routes>
            <Route path="/" element={<ChessTeamLandingPage />} />
            <Route path="/games" element={<GamesPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
