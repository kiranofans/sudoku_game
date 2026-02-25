import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="instructions-overlay" onClick={onClose}>
            <div className="instructions-content" onClick={(e) => e.stopPropagation()}>
                <button className="instruct-close-btn" onClick={onClose} aria-label="Close modal"></button>
                <h3 className="content-title">{title}</h3>
                {children}
            </div>
        </div>
    );
};

export const AboutModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="About Sudoku Game">
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <p>A lightweight Sudoku game built with TypeScript.</p>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                Enjoy a clean, fast, and challenging Sudoku experience.
            </p>
        </div>
    </Modal>
);

export const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Us">
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <p>For support or feedback, please contact us at:</p>
            <a
                href="mailto:support@example.com"
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
    <Modal isOpen={isOpen} onClose={onClose} title="How to Play Sudoku">
        <h4>Quick Guide</h4>
        <p>Fill each row, column, and 3×3 box with numbers 1–9 without repeating.</p>

        <h4>Detailed Sudoku Guide</h4>
        <ol type="1">
            <li>Click a cell to select it.</li>
            <li>Type a number (1–9) or use the number pad to fill it in.</li>
            <li>Switch to <b>Pencil Mode</b> to make notes for possible numbers.</li>
            <li>You can use up to 3 hints during the game.</li>
            <li>The game ends after 3 mistakes or when the puzzle is solved.</li>
        </ol>

        <h4>About the Number Pad</h4>
        <p>The large blue buttons are for input. Each button also shows the <b>remaining count</b> of that number in the bottom-right corner.</p>

        <h4>About the Scoring System</h4>
        <p>Your score is based on difficulty, time, and mistakes:</p>
        <ol type="1">
            <li>Earn a <b>Base Score</b> based on difficulty (up to 50,000 for Expert).</li>
            <li>Each second costs <b>10 points</b>.</li>
            <li>Each mistake costs <b>1,000 points</b>.</li>
        </ol>
    </Modal>
);
