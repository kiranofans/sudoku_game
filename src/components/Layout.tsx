import React, { useEffect, useState } from 'react';
import packageJson from '../../package.json';
import ThemeSelector from './ThemeSelector';
import MobileDrawer from './MobileDrawer';
import { OutlinedButton } from './SmallUiWidgets';

interface LayoutProps {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  mobileScore?: React.ReactNode;
  isPaused?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, headerContent, mobileScore, isPaused }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Add this
  const [currentPath, setCurrentPath] = useState('');
  const currentYear = new Date().getFullYear();

  const handleLogoClick = (e: React.MouseEvent) => {
    // Only trigger drawer on mobile portrait
    if (window.innerWidth < 768 && window.innerHeight > window.innerWidth) {
      e.preventDefault();
      setIsDrawerOpen(true);
    }
  };

  useEffect(() => {
    setIsMounted(true); // Set to true only after the browser takes over
    setCurrentPath(window.location.pathname);
  }, []);

  const [isMobilePortrait, setIsMobilePortrait] = useState(false);

  useEffect(() => {
    const checkMobilePortrait = () => {
      setIsMobilePortrait(window.innerWidth < 768 && window.innerHeight > window.innerWidth);
    };

    checkMobilePortrait();
    window.addEventListener('resize', checkMobilePortrait);
    return () => window.removeEventListener('resize', checkMobilePortrait);
  }, []);

  return (
    <>
      {/* Only render the shield if we are on the client side */}
      {isMounted && (<div className="ios-landscape-shield fixed inset-0 z-[99999] bg-slate-900 flex-col items-center justify-center text-white px-6 text-center">
        <div className="text-6xl mb-6 animate-bounce">🔄</div>
        <h2 className="text-3xl font-bold mb-2">Rotate your iPhone</h2>
        <p className="text-slate-400">This layout is optimized for portrait mode on iOS.</p>
      </div>)}

      <div className="wrapper min-h-screen flex flex-col">
        <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

        <header className={`menu-bar ${isPaused ? 'relative' : ''}`} style={isPaused ? { zIndex: 10010 } : undefined}>
          <div className="logo-title-container">
            <div className="relative flex items-center">
              <a
                href="/"
                className="logo-link flex items-center group"
                onClick={handleLogoClick}
                aria-label="Toggle menu on mobile or go to homepage"
              >
                <img src="/images/png/logo_sudoku1.png" alt="Logo" className="logo transition-transform active:scale-10" />
              </a>
            </div>

            <div className="title-score-wrapper">
              <div className="title-tagline-container flex">
                <h2 className='game-title'>Sudoku</h2>
                <div className='m-0.5 text-sm'>
                  {/* What's New icon when screen is in portrait mode on mobile */}
                  {isMobilePortrait ?
                    <a
                      href='/changeLog'
                      className="p-0 m-0 border-0 cursor-pointer w-fit bg-transparent"
                      aria-label="What's New"
                    >
                      <svg className="w-4 h-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.25 13.125L10.5 15L14.25 16.875L16.5 22.5L18.75 16.875L22.5 15L18.75 13.125L16.5 
                        7.5L14.25 13.125ZM9 18C8.60218 18 8.22064 18.158 7.93934 18.4393C7.65804 18.7206 7.5 19.1022 
                        7.5 19.5C7.5 19.8978 7.65804 20.2794 7.93934 20.5607C8.22064 20.842 8.60218 21 9 21C9.39782 
                        21 9.77936 20.842 10.0607 20.5607C10.342 20.2794 10.5 19.8978 10.5 19.5C10.5 19.1022 10.342 
                        18.7206 10.0607 18.4393C9.77936 18.158 9.39782 18 9 18ZM4.5 13.5C4.10218 13.5 3.72064 13.658 
                        3.43934 13.9393C3.15804 14.2206 3 14.6022 3 15C3 15.3978 3.15804 15.7794 3.43934 16.0607C3.72064 
                        16.342 4.10218 16.5 4.5 16.5C4.89782 16.5 5.27936 16.342 5.56066 16.0607C5.84196 15.7794 6 15.3978 
                        6 15C6 14.6022 5.84196 14.2206 5.56066 13.9393C5.27936 13.658 4.89782 13.5 4.5 13.5ZM4.0965 4.962L1.5 
                        6L4.0965 7.0365L5.25 10.5L6.405 7.0365L9 6L6.405 4.962L5.25 1.5L4.0965 4.962ZM19.5 3C19.1022 3 18.7206 
                        3.15804 18.4393 3.43934C18.158 3.72064 18 4.10218 18 4.5C18 4.89782 18.158 5.27936 18.4393 5.56066C18.7206 
                        5.84196 19.1022 6 19.5 6C19.8978 6 20.2794 5.84196 20.5607 5.56066C20.842 5.27936 21 4.89782 21 4.5C21 4.10218 
                        20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3Z"
                          fill="orange" />
                      </svg>


                    </a>
                    :
                    <OutlinedButton
                      text="What's new?"
                      href='/changeLog'
                      borderColor=""
                      bgColor=""
                    />
                  }

                </div>
              </div>
            </div>
          </div>

          <div className="header-center-content">
            {mobileScore}
          </div>

          <div className='controls-row'>
            <a href="/sudokuTips" className={`header-nav-item desktop-only-nav${currentPath === '/sudokuTips' ? ' active' : ''}`}>Tips</a>
            <span className="header-nav-separator desktop-only-nav">|</span>

            <a href="/about" className={`header-nav-item desktop-only-nav${currentPath === '/about' ? ' active' : ''}`}>About</a>
            <span className="header-nav-separator desktop-only-nav">|</span>
            <a href="/contact" className={`header-nav-item desktop-only-nav${currentPath === '/contact' ? ' active' : ''}`}>Contact</a>

            {headerContent}
            <ThemeSelector />
          </div>
        </header>

        <hr className="divider" />

        {children}

        <footer className={`site-footer bg-white border-t border-gray-200 [transform:translateZ(0)] ${isPaused ? 'relative' : ''}`}
          style={{ zIndex: isPaused ? 10010 : 100 }}>
          <div className="footer-copyright">
            <span>&copy; {currentYear} sudokuplays.com v{packageJson.version} | All rights reserved.</span>
          </div>
          <div className="footer-links">
            <a href="/privacyPolicy" className="footer-btn">Privacy Policy</a>

            <a href="/termsAndConditions" className="footer-btn">Terms & conditions</a>
            <a href="/faq" className="footer-btn" style={{ textDecoration: 'none' }}>FAQ</a>
            <a href="/detailedGuide" className="footer-btn" style={{ textDecoration: "none" }}>How SudokuPlays Works?</a>
            {/* <a href="/changeLog" className="footer-btn hidden md:inline-flex"
              style={{ textDecoration: 'none' }}>What's New?</a> */}

          </div>
          <div className="social-links">
            <a href="https://github.com/kiranofans" target="_blank" rel="noopener noreferrer"
              className="social-icon" aria-label="GitHub" >

              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-describedby="svg-title svg-description">
                <title className='sr-only' id="svg-title">Github icon</title>
                <desc id="svg-description">Clickable Github social meida handle</desc>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
            </a>
          </div>
        </footer >
      </div ></>
  );
};

export default Layout;
