import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import packageJson from '../../package.json';
import { PrivacyPolicyModal, TermsAndConditionsModal } from '../components/Modals';
import ThemeSelector from '@/components/ThemeSelector';

const About: React.FC = () => {
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

            <main className="sudoku-app" style={{ padding: '8rem 2rem 6rem', maxWidth: '900px', textAlign: 'center', margin: '0 auto', flex: '1 0 auto' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '0.1rem' }}>About this Site</h1>
                <div style={{ padding: '1rem 0', fontSize: '1.1rem', lineHeight: '1.6' }}>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                        sudokuplays.com is a simple, fast, and distraction-free place to enjoy Sudoku anytime.
                    </p>

                    <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>
                        The goal of this site is to provide a clean,
                        smooth, convenient and accessible puzzle experience without unnecessary complexity.
                        Whether you're a beginner learning the basics or someone looking for a quick mental challenge,
                        sudokuplays.com offers a clean interface that lets you focus entirely on solving puzzles.
                    </p>

                    <p style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
                        The game features a simple interface, responsive controls, and smooth performance directly in your browser.
                        Whether you're solving a quick puzzle during a break or challenging yourself to improve your logic skills,
                        this project aims to make Sudoku accessible and enjoyable for everyone.
                    </p>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                        Designed with simplicity in mind, sudokuplays.com runs entirely on the web with no downloads required.
                    </p>

                    {/* What you will find here */}
                    <h2 style={{ textAlign: 'center', marginBottom: '0.1rem' }}>What you will find here</h2>

                    <p style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
                        <ul style={{ textAlign: 'left', fontSize: '1.2rem' }}>
                            <li>Multiple difficulty levels to match your skill</li>
                            <li>A responsive design that works on desktop and mobile</li>
                            <li>Helpful tools and tips to improve your solving techniques</li>
                            <li>A lightweight experience with fast loading and minimal clutter</li>
                        </ul>
                    </p>

                    <p style={{ marginTop: '2.5rem', fontSize: '1.2rem', color: '#666', textAlign: 'center' }}>
                    </p>
                    <h2 style={{ textAlign: 'center', marginBottom: '0.1rem' }}>Why this Site Exists</h2>
                    <p style={{ marginTop: '2.5rem', marginBottom: '0.1rem' }}>
                        sudokuplays.com.com was created to make Sudoku easy to access and
                        enjoyable without requiring downloads, accounts, or complicated features.
                        It’s built with performance and usability in mind, so you can start playing
                        instantly with almost no concerns about data collection or privacy.
                    </p>
                </div>

                {/* Continuous Improvement> */}
                <div style={{ padding: '1rem 0', fontSize: '1.2rem', lineHeight: '1.6' }}>

                    <h2 style={{ textAlign: 'center', marginBottom: '0.1rem' }}>Continuous Improvement</h2>

                    <p style={{ marginTop: '1.5rem', fontSize: '1.2rem', textAlign: 'center' }} className='dark:text-white'>
                        The site is actively being improved with new features, better usability,
                        and more helpful content for players who want to sharpen their skills.
                    </p>
                </div>

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
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
                    {/* <Link to="/about" className="footer-btn" style={{ textDecoration: 'none' }}>About</Link>
                    <Link to="/contact" className="footer-btn" style={{ textDecoration: 'none' }}>Contact</Link> */}
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

export default About;
