// src/components/ThemeToggle.tsx
import { useTheme } from './ThemeProvider';
import { Button } from '../components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  const isDarkMode = theme === 'dark' || 
    (theme === 'system' && 
     typeof window !== 'undefined' && 
     window.matchMedia('(prefers-color-scheme: dark)').matches);

  const handleToggle = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="relative text-white dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-white dark:hover:text-white rounded-lg p-2 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
      style={{ color: 'white' }}
    >
      <div className="relative">
        {isDarkMode ? (
          <Sun className="h-6 w-6 transition-all duration-300 ease-in-out rotate-0 scale-100" />
        ) : (
          <Moon className="h-6 w-6 transition-all duration-300 ease-in-out rotate-0 scale-100" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

