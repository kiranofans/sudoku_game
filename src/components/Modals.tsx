import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: React.ReactNode;
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

export const InstructionsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title={<b className="text-2xl">How to Play</b>}>
        <div className="space-y-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-left">
            <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-1 border-b border-gray-200 dark:border-gray-700 pb-1">Quick Guide</h4>
                <p>Fill each row, column, and 3×3 box with numbers 1–9 without repeating.</p>
            </div>

            <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">Detailed Sudoku Guide</h4>
                <ol className="list-decimal pl-5 space-y-1">
                    <li>Click a cell to select it.</li>
                    <li>Type a number (1–9) or use the number pad to fill it in.</li>
                    <li>Switch to <b className="text-gray-900 dark:text-gray-100">Pencil Mode</b> to make notes for possible numbers.</li>
                    <li>You can use up to 3 hints during the game.</li>
                    <li>The game ends after 10 mistakes or when the puzzle is solved.</li>
                </ol>
            </div>

            <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-1 border-b border-gray-200 dark:border-gray-700 pb-1">About the Number Pad</h4>
                <p>The large blue buttons are for input.</p>
                <p className="mt-1">Each button also shows the <b className="text-gray-900 dark:text-gray-100">remaining count</b> of that number in the bottom-right corner.</p>
            </div>

            <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">About the Scoring System</h4>
                <p className="mb-2">Your score updates in <b className="text-gray-900 dark:text-gray-100">real-time</b> as you play:</p>
                <ol className="list-decimal pl-5 space-y-1">
                    <li>Initially, the score shows <b className="text-gray-900 dark:text-gray-100">- - - -</b> until you earn points.</li>
                    <li>Earn <b className="text-gray-900 dark:text-gray-100">Bonus Points</b> for every correct number placed.</li>
                    <li>Higher difficulty levels provide a much larger <b className="text-gray-900 dark:text-gray-100">Score Multiplier</b>.</li>
                    <li>Making a <b className="text-gray-900 dark:text-gray-100">Mistake</b> or taking too much <b className="text-gray-900 dark:text-gray-100">Time</b> will reduce your score.</li>
                    <li>After <b className="text-gray-900 dark:text-gray-100">10 Mistakes</b> the game will end.</li>
                </ol>
            </div>
        </div>
    </Modal>
);

// export const AccessibilityModal:React.FC<{isOpen: boolean; onClose:()=>void;}>= ({isOpen, onClose})=>{
//     React.useEffect(()=>{
//         if(isOpen){

//         }
//     },[isOpen])
// }
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
