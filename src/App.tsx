import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext.tsx';

// Import Global Styles
import './App.css';

// Import the new Homepage (where we moved the game logic)
import Homepage from './pages/Homepage.tsx';

// Import all other sub-pages
import Faq from './pages/faq.tsx';
import SudokuTips from './pages/SudokuTips.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';
import TermsAndConditions from './pages/TermsAndConditions.tsx';
import ChangeLog from './pages/ChangeLog.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';

/**
 * Main App Component
 * Focuses strictly on Routing. 
 * The game logic now lives in pages/Homepage.tsx
 */
function App() {
  return (
    <Routes>
      {/* Root path now loads the extracted Homepage component */}
      <Route path="/" element={<Homepage />} />

      {/* Sub-pages */}
      <Route path="/changeLog" element={<ChangeLog />} />
      <Route path="/sudokuTips" element={<SudokuTips />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/termsAndConditions" element={<TermsAndConditions />} />
    </Routes>
  );
}

/**
 * AppWrapper
 * Wraps the app in necessary Providers (Theme, Auth, etc.)
 */
export default function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}