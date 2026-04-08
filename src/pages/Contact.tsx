import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const Contact: React.FC = () => {
    return (
        <Layout>
            <main className="sudoku-app" style={{ width: '100%', padding: '8rem 2rem 6rem', maxWidth: '900px', textAlign: 'left', margin: '0 auto', flex: '1 0 auto' }}>
                <h1 className="text-3xl font-bold text-center mt-6 mb-8 dark:text-white">Contact</h1>

                <div style={{ textAlign: 'center', padding: '2rem 0', fontSize: '1.2rem', lineHeight: '1.6' }} className="dark:text-gray-200">
                    <p style={{ marginBottom: '1.5rem' }}>For support or feedback, please contact us at:</p>
                    <a
                        href="mailto:sitehelp.chat@gmail.com"
                        className="dark:bg-gray-800 dark:text-blue-400 dark:border-gray-700"
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

                    <p style={{ marginTop: '3.5rem', fontSize: '1rem' }} className="text-gray-600 dark:text-gray-400">
                        We value your input and strive to respond to all inquiries as quickly as possible.
                    </p>
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link to="/" className="new-game-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                        Back to Game
                    </Link>
                </div>
            </main>
        </Layout>
    );
};

export default Contact;
