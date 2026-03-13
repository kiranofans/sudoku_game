import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    closeable?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, closeable = true }) => {
    if (!isOpen) return null;

    const handleBackdropClick = () => {
        if (closeable) onClose();
    };

    return (
        <div className="instructions-overlay" onClick={handleBackdropClick}>
            <div className="instructions-content" onClick={(e) => e.stopPropagation()}>
                {closeable && <button className="instruct-close-btn" onClick={onClose} aria-label="Close modal"></button>}
                <h3 className="content-title">{title}</h3>
                {children}
            </div>
        </div>
    );
};

export const AboutModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="About Sudoku Game">
        <div style={{ padding: '0.5rem 0' }}>
            <p>
                Sudoku Game is a lightweight puzzle application built with <strong>TypeScript</strong> and modern web technologies.
                It focuses on providing a clean, fast, and distraction-free experience so players can enjoy the classic logic puzzle
                without unnecessary complexity.
            </p>

            <p>
                The game features a simple interface, responsive controls, and smooth performance directly in your browser.
                Whether you're solving a quick puzzle during a break or challenging yourself to improve your logic skills,
                this project aims to make Sudoku accessible and enjoyable for everyone.
            </p>

            <p>
                Designed with simplicity in mind, Sudoku Game runs entirely on the web with no downloads required.
            </p>
            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
                Enjoy the challenge, sharpen your logic, and have fun solving! 🧩
            </p>
        </div>
    </Modal>
);

export const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact">
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <p>For support or feedback, please contact us at:</p>
            <a
                href="mailto:sitehelp.chat@gmail.com"
                style={{
                    display: 'block',
                    marginTop: '1rem',
                    color: '#2980b9',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                }}
            >
                support@example.com
            </a>
        </div>
    </Modal>
);

export const InstructionsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="How to Play">
        <h4>Quick Guide</h4>
        <p>Fill each row, column, and 3×3 box with numbers 1–9 without repeating.</p>

        <h4>Detailed Sudoku Guide</h4>
        <ol type="1">
            <li>Click a cell to select it.</li>
            <li>Type a number (1–9) or use the number pad to fill it in.</li>
            <li>Switch to <b>Pencil Mode</b> to make notes for possible numbers.</li>
            <li>You can use up to 3 hints during the game.</li>
            <li>The game ends after 10 mistakes or when the puzzle is solved.</li>
        </ol>

        <h4>About the Number Pad</h4>
        <p>The large blue buttons are for input. Each button also shows the <b>remaining count</b> of that number in the bottom-right corner.</p>

        <h4>About the Scoring System</h4>
        <p>Your score updates in <b>real-time</b> as you play:</p>
        <ol type="1">
            <li>Initially, the score shows <b>- - - -</b> until you earn points.</li>
            <li>Earn <b>Bonus Points</b> for every correct number placed.</li>
            <li>Higher difficulty levels provide a much larger <b>Score Multiplier</b>.</li>
            <li>Making a <b>Mistake</b> or taking too much <b>Time</b> will reduce your score.</li>
            <li>After <b>10 Mistakes</b> the game will end.</li>

        </ol>
    </Modal>
);

export const PrivacyPolicyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy">
        <div className="privacy-policy-content" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-color)', textAlign: 'left' }}>
            <div style={{ marginBottom: '1.5rem', padding: '10px', background: '#f0f7ff', borderRadius: '6px', border: '1px solid #cce5ff' }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#004085' }}>
                    View online: <a href="https://www.freeprivacypolicy.com/live/6b2c3629-c588-47d4-8c1a-7d44eb7dc7f4" target="_blank" rel="noopener noreferrer" style={{ color: '#0056b3' }}>Privacy Policy Link</a>
                </p>
            </div>

            <p><strong>Last updated: March 13, 2026</strong></p>
            <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
            <p>We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>

            <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Interpretation and Definitions</h3>
            <h4>Interpretation</h4>
            <p>The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>

            <h4>Definitions</h4>
            <p>For the purposes of this Privacy Policy:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '10px' }}><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                <li style={{ marginBottom: '10px' }}><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party...</li>
                <li style={{ marginBottom: '10px' }}><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Privacy Policy) refers to Sudoku.</li>
                <li style={{ marginBottom: '10px' }}><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website...</li>
                <li style={{ marginBottom: '10px' }}><strong>Country</strong> refers to: British Columbia, Canada</li>
                <li style={{ marginBottom: '10px' }}><strong>Device</strong> means any device that can access the Service such as a computer, a cell phone or a digital tablet.</li>
                <li style={{ marginBottom: '10px' }}><strong>Personal Data</strong> (or "Personal Information") is any information that relates to an identified or identifiable individual.</li>
                <li style={{ marginBottom: '10px' }}><strong>Service</strong> refers to the Website.</li>
                <li style={{ marginBottom: '10px' }}><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company...</li>
                <li style={{ marginBottom: '10px' }}><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself.</li>
                <li style={{ marginBottom: '10px' }}><strong>Website</strong> refers to Sudoku, accessible from <a href="https://sudokuplays.com" target="_blank" rel="noopener noreferrer">sudokuplays.com</a>.</li>
                <li style={{ marginBottom: '10px' }}><strong>You</strong> means the individual accessing or using the Service...</li>
            </ul>

            <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Collecting and Using Your Personal Data</h3>
            <h4>Types of Data Collected</h4>
            <h5>Personal Data</h5>
            <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You.</p>

            <h5>Usage Data</h5>
            <p>Usage Data is collected automatically when using the Service. It may include information such as Your Device's IP address, browser type, pages visited, and time spent on pages.</p>

            <h5>Tracking Technologies and Cookies</h5>
            <p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information.</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '10px' }}><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device.</li>
                <li style={{ marginBottom: '10px' }}><strong>Web Beacons.</strong> Electronic files that permit the Company to count users or collect related statistics.</li>
            </ul>

            <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Detailed Information on Processing</h3>
            <h4>Advertising</h4>
            <p>We may use Service Providers to show advertisements to You to help support and maintain Our Service.</p>
            <div style={{ padding: '15px', background: 'var(--button-bg)', borderRadius: '8px', marginTop: '10px' }}>
                <p><strong>Google AdSense & DoubleClick Cookie</strong></p>
                <p>Google, as a third party vendor, uses cookies to serve ads on our Service. You may opt out of the use of the DoubleClick Cookie by visiting the <a href="http://www.google.com/ads/preferences/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> page.</p>
            </div>

            <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, You can contact us:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
                <li><strong>By email:</strong> <a href="mailto:sitehelp.chat@gmail.com">sitehelp.chat@gmail.com</a></li>
            </ul>
        </div>
    </Modal>
);

export const AdModal: React.FC<{ isOpen: boolean; onClose: () => void; onAdComplete: () => void }> = ({ isOpen, onClose, onAdComplete }) => {
    const [timeLeft, setTimeLeft] = React.useState(10); // 10 second delay
    const [isCounting, setIsCounting] = React.useState(false);

    React.useEffect(() => {
        if (isOpen) {
            setTimeLeft(10);
            setIsCounting(true);
        } else {
            setIsCounting(false);
        }
    }, [isOpen]);

    React.useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isCounting && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0) {
            setIsCounting(false);
        }
        return () => clearTimeout(timer);
    }, [isCounting, timeLeft]);

    const handleClaimHint = () => {
        onAdComplete();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Watch Ad for a Hint" closeable={timeLeft === 0}>
            <div style={{ textAlign: 'center', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <p>Support us by watching a short ad to earn 1 extra hint!</p>
                <div className="ads-part" style={{ width: '100%', minHeight: '250px', margin: '0.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f9f9', borderRadius: '8px', border: '1px dashed #ccc', position: 'relative' }}>
                    {/* The Google AdSense script code snippet provided by the user */}
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6867248544126643"
                        crossOrigin="anonymous"></script>
                    <p style={{ fontSize: '0.8rem', color: '#888' }}>[Ad Unit Placeholder]</p>

                    {timeLeft > 0 && (
                        <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                            Wait {timeLeft}s to claim
                        </div>
                    )}
                </div>
                <button
                    onClick={handleClaimHint}
                    disabled={timeLeft > 0}
                    className="new-game-btn"
                    style={{
                        width: 'auto',
                        padding: '10px 30px',
                        opacity: timeLeft > 0 ? 0.5 : 1,
                        cursor: timeLeft > 0 ? 'not-allowed' : 'pointer'
                    }}
                >
                    {timeLeft > 0 ? `Wait ${timeLeft}s...` : 'Claim Hint'}
                </button>
            </div>
        </Modal>
    );
};
