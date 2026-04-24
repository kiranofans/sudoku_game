import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import packageJson from '../../package.json';
import ThemeSelector from './ThemeSelector';
import MobileDrawer from './MobileDrawer';

interface LayoutProps {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  mobileScore?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, headerContent, mobileScore }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleLogoClick = (e: React.MouseEvent) => {
    // Only trigger drawer on mobile portrait
    if (window.innerWidth < 768 && window.innerHeight > window.innerWidth) {
      e.preventDefault();
      setIsDrawerOpen(true);
    }
  };

  return (
    <>
      {/* Put description meta tag here for Homepage description only */}
      <meta name="description"
        content="Play Sudoku online for free. Features real-time scoring, dark mode, and a mobile-friendly design for iOS. Start your daily challenge today!" />

      <div className="ios-landscape-shield fixed inset-0 z-[99999] bg-slate-900 flex-col items-center justify-center text-white px-6 text-center">
        <div className="text-6xl mb-6 animate-bounce">🔄</div>
        <h1 className="text-3xl font-bold mb-2">Rotate your iPhone</h1>
        <p className="text-slate-400">This layout is optimized for portrait mode on iOS.</p>
      </div>
      <div className="wrapper min-h-screen flex flex-col">
        <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

        <header className="menu-bar">
          <div className="logo-title-container">
            <div className="relative flex items-center">
              <Link
                to="/"
                className="logo-link flex items-center group"
                onClick={handleLogoClick}
                aria-label="Toggle menu on mobile or go to homepage"
              >
                <img src="/images/png/logo_sudoku1.png" alt="Logo" className="logo transition-transform active:scale-10" />
              </Link>
            </div>

            <div className="title-score-wrapper">
              <div className="title-tagline-container">
                <h2 className='game-title'>Sudoku</h2>
              </div>
              {mobileScore}
            </div>
          </div>

          <div className='controls-row'>
            <Link to="/sudokuTips" className="header-nav-item desktop-only-nav">Tips</Link>
            <span className="header-nav-separator desktop-only-nav">|</span>
            <Link to="/faq" className='header-nav-item desktop-only-nav'>FAQ</Link>
            <span className="header-nav-separator desktop-only-nav">|</span>
            <Link to="/about" className="header-nav-item desktop-only-nav">About</Link>
            <span className="header-nav-separator desktop-only-nav">|</span>
            <Link to="/contact" className="header-nav-item desktop-only-nav">Contact</Link>

            {headerContent}
            <ThemeSelector />
          </div>
        </header>

        <hr className="divider" />

        {children}

        <footer className="site-footer z-[100] bg-white border-t border-gray-200 
       [transform:translateZ(0)]">
          <div className="footer-copyright">
            <span>&copy; {currentYear} sudokuplays.com v{packageJson.version} | All rights reserved.</span>
          </div>
          <div className="footer-links">
            <Link to="/privacyPolicy" className="footer-btn">Privacy Policy</Link>

            <Link to="/termsAndConditions" className="footer-btn">Terms & conditions</Link>
            <Link to="/ChangeLog" className="footer-btn md:inline-flex landscape:inline-flex portrait:hidden" style={{ textDecoration: 'none' }}>What's New?</Link>

          </div>
          <div className="social-links">
            <a href="https://github.com/kiranofans" target="_blank" rel="noopener noreferrer"
              className="social-icon" aria-label="GitHub" >

              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-describedby="svg-title svg-description">
                <title id="svg-title">Github icon</title>
                <desc id="svg-description">Clickable Github social meida handle</desc>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
            </a>
          </div>
        </footer>
      </div></>
  );
};

export default Layout;
