import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChessTeamLandingPage from './components/ChessTeamLandingPage';
import GamesPage from './components/GamesPage';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Container } from './components/ui/container';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Router>
        <Container className="min-h-screen bg-blue-50 dark:bg-gray-900 p-0">
          <Card className="bg-blue-900 dark:bg-blue-950 text-white rounded-none">
            <CardContent className="max-w-6xl mx-auto flex justify-between items-center p-4">
              <div className="text-xl font-bold">UCR Chess</div>
              <div className="flex items-center space-x-4">
                <Link to="/" className="no-underline">
                  <Button variant="ghost">Home</Button>
                </Link>
                <Link to="/games" className="no-underline">
                  <Button variant="ghost">Games</Button>
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
