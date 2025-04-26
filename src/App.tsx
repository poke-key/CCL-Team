import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChessTeamLandingPage from './components/ChessTeamLandingPage';
import GamesPage from './components/GamesPage';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Router>
        <div className="min-h-screen bg-blue-50 dark:bg-gray-900">
          {/* Navigation */}
          <nav className="bg-blue-900 dark:bg-blue-950 text-white p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div className="font-bold text-xl">UCR Chess</div>
              <div className="flex items-center space-x-6">
                <ul className="flex space-x-6">
                  <li>
                    <Link to="/" className="hover:text-blue-300 transition-colors">Home</Link>
                  </li>
                  <li>
                    <Link to="/games" className="hover:text-blue-300 transition-colors">Games</Link>
                  </li>
                </ul>
                <ThemeToggle />
              </div>
            </div>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<ChessTeamLandingPage />} />
            <Route path="/games" element={<GamesPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;