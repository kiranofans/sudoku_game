import { ThemeProvider } from './components/ThemeContext.tsx';

// Import Global Styles
import './App.css';

// Import the new Homepage (where we moved the game logic)
import Homepage from './pages/Homepage.tsx';

/**
 * AppWrapper
 * Wraps the app in necessary Providers (Theme, Auth, etc.)
 */
export default function AppWrapper() {
  return (
    <ThemeProvider>
      <Homepage />
    </ThemeProvider>
  );
}