import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import packageJson from '../../package.json';
import { PrivacyPolicyModal, TermsAndConditionsModal } from '../components/Modals';
import ThemeSelector from '@/components/ThemeSelector';

const Contact: React.FC = () => {
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const currentYear = new Date().getFullYear();

    return (
        <div className="wrapper">
            <header className="menu-bar">
                <div className="logo-title-container">
                    <Link to="/" className="logo-link" aria-label="Go to homepage" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/images/png/logo_sudoku1.png" alt="Logo" className="logo" />
                    </Link>
                    <div className="title-score-wrapper">
                        <div className="title-tagline-container">
                            <h2 className='game-title'>Sudoku</h2>
                        </div>
                    </div>
                </div>
                <div className='controls-row'>
                    <Link to="/faq" className='header-nav-item desktop-only-nav'>FAQ</Link>
                    <span className="header-nav-separator desktop-only-nav">|</span>
                    <Link to="/about" className="header-nav-item desktop-only-nav">About</Link>
                    <span className="header-nav-separator desktop-only-nav">|</span>
                    <Link to="/contact" className="header-nav-item desktop-only-nav">Contact</Link>
                    <ThemeSelector />

                </div>
            </header>
            <hr className="divider" />

            <main className="sudoku-app" style={{ padding: '8rem 2rem 6rem', maxWidth: '800px', textAlign: 'left', margin: '0 auto', flex: '1 0 auto' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Contact</h1>

                <div style={{ textAlign: 'center', padding: '2rem 0', fontSize: '1.2rem', lineHeight: '1.6' }}>
                    <p style={{ marginBottom: '1.5rem' }}>For support or feedback, please contact us at:</p>
                    <a
                        href="mailto:sitehelp.chat@gmail.com"
                        style={{
                            display: 'inline-block',
                            marginTop: '1rem',
                            color: '#2980b9',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--button-bg)',
                            border: '1px solid var(--button-border)'
                        }}
                    >
                        sitehelp.chat@gmail.com
                    </a>

                    <p style={{ marginTop: '3.5rem', fontSize: '1rem', color: '#666' }}>
                        We value your input and strive to respond to all inquiries as quickly as possible.
                    </p>
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link to="/" className="new-game-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                        Back to Game
                    </Link>
                </div>
            </main>

            <footer className="site-footer">
                <div className="footer-copyright">
                    <span>&copy; {currentYear} sudokuplays.com v{packageJson.version} | All rights reserved.</span>
                </div>
                <div className="footer-links">
                    <Link to="/about" className="footer-btn" style={{ textDecoration: 'none' }}>About</Link>
                    <button className="footer-btn" onClick={() => setShowPrivacyModal(true)}>Privacy Policy</button>
                    <button className="footer-btn" onClick={() => setShowTermsModal(true)}>Terms & Conditions</button>
                </div>
                <div className="social-links">
                    <a href="https://github.com/kiranofans" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                        </svg>
                    </a>
                </div>
            </footer>

            <PrivacyPolicyModal
                isOpen={showPrivacyModal}
                onClose={() => setShowPrivacyModal(false)}
            />
            <TermsAndConditionsModal
                isOpen={showTermsModal}
                onClose={() => setShowTermsModal(false)}
            />
        </div>
    );
};

export default Contact;
