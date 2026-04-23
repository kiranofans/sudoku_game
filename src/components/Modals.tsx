import React from 'react';
import { Link } from 'react-router-dom';

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
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-1 border-b border-gray-200 dark:border-gray-700 pb-1">The Objective</h4>
                <p>To win, every Row (left to right), every Column (up and down), and every 3x3 Square must have the numbers 1, 2, 3, 4, 5, 6, 7, 8, and 9.<br />
                    <b className='pl-6'>Tip:</b> A number cannot appear more than once in any row, column, or 3×3 box.</p>
            </div>

            <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">Quick Sudoku Guide</h4>
                <ol className="list-decimal pl-5 space-y-1">
                    <li><b>Selecting a Cell: </b> Click/tap any cell to select it. The game will <b className="text-gray-900 dark:text-gray-100">highlight</b> the row, column, and 3x3 box to help finding out where numbers are missing.</li>
                    <li><b>Match Tracking:</b> Click/tap on any existing number, including completed/fixed numbers/cells, to instantly highlight all matching digits across the board.</li>
                    <li><b>Placing a Number: </b>Once an empty cell is selected, type a number from 1 to 9 using the physical keyboard, buttons on mobile devies, or click/tap the corresponding digit on the on-screen number pad to lock in the answer.
                        Incorrect input(s) can also be replaced with another number.
                        <p>Be aware that if a <b className="text-gray-900 dark:text-gray-100">domain</b> (row, col, or 3x3 box) was completed, it won't be able to place a number but to select.</p>
                    </li>
                    <li><b className=""> Using Pencil Mode:</b> Click/tap on <b className="text-gray-900 dark:text-gray-100">Pencil Mode</b> action button to make notes for possible numbers inside a single cell if players are not sure yet.</li>
                    <li><b>Using the Eraser: </b>
                        If inccorect number(s) inputted, click/tap on <b className="text-gray-900 dark:text-gray-100">Eraser</b> to delete.
                        And the <b>Eraser</b> can be used to delete those <b className="text-gray-900 dark:text-gray-100">Pencil</b>  notes.
                        if a <b className='text-gray-900 dark:text-gray-100'>domain</b> was completed, the eraser will not work on those cells.
                    </li>
                    <li>
                        <b>Using the Reset Button: </b>
                        By clicking/tapping on the <b className="text-gray-900 dark:text-gray-100">Reset Button</b>, the system will reset the entire board/game, including the <b className="text-gray-900 dark:text-gray-100">Pencil</b> notes and <b className="text-gray-900 dark:text-gray-100">Hints</b> used.
                    </li>
                    <li>
                        <b>Stuck?</b> Use up to <b className='text-[1rem] text-gray-900 dark:text-gray-100'>3</b> hints per game to get the correct number for tricky cell(s).
                        The hints will replace the incorrect inputs and/or the <b>Pencil</b> notes.
                        <br />Out of hints? Earn extra ones by watching a quick <b className="text-gray-900 dark:text-gray-100">Ad</b>.
                    </li>
                    <li><b>Winning and Losing: </b>
                        The game is won when all the empty cells are filled and no red number shows.
                        <br />Be careful—making <b className='text-[1rem] text-gray-900 dark:text-gray-100'>10</b> mistakes will end the game early.</li>
                </ol>
            </div>

            <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-1 border-b border-gray-200 dark:border-gray-700 pb-1">About the Number Pad</h4>
                <p>The <b className="text-gray-900 dark:text-gray-100">blue buttons</b> are for input.</p>
                <p className="mt-1">Each button also shows the <b className="text-gray-900 dark:text-gray-100">remaining count</b> of that number in the bottom-right corner, or below each number on the portrait mobile screens.</p>
                <p>If a domain was completed, the number pad will not work on those cells.</p>
            </div>

            <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-1 border-b 
                border-gray-200 dark:border-gray-700 pb-1">About the Keyboard</h4>
                <p>The up, down, left, and right arrow keys <b className="text-gray-900 dark:text-gray-100"> (↑, ↓, ←, →) </b> can be used to navigate through the cells.</p>
                <p className="">Numbers <b className='text-gray-900 dark:text-gray-100'>1-9</b> from the keyboard can be used to input numbers into the selected cell.</p>
                <p>If a domain was completed and fixed, the keyboard also won't work on those cells.</p>
            </div>

            <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">About the Scoring System</h4>
                <p className="mb-2">The score is calculated in <b className="text-gray-900 dark:text-gray-100">real time</b>. The final score is calculated using the total time after the game ends:</p>
                <ol className="list-decimal pl-5 space-y-1">
                    <li>Initially, the score shows <b className="text-gray-900 dark:text-gray-100">- - - -</b> until inputting a number.</li>
                    <li>Earn <b className="text-gray-900 dark:text-gray-100">Bonus Points</b> for every correct number placed.</li>
                    <li>Higher <b className="text-gray-900 dark:text-gray-100">difficulty levels</b> provide a much larger <b className="text-gray-900 dark:text-gray-100">Score Multiplier</b>.</li>
                    <li>Making a <b className="text-gray-900 dark:text-gray-100">Mistake</b> or taking too much <b className="text-gray-900 dark:text-gray-100">Time</b> will reduce the final score.</li>
                    <li>After <b className="text-gray-900 dark:text-gray-100">10 Mistakes</b> the game will end.</li>
                </ol>
            </div>
            <div className="pt-2 text-center" style={{ fontSize: "0.8rem" }}>
                <span className='font-bold text-gray-700 dark:text-gray-400'> For more professional & detailed skill development, visit the <Link to="/sudokuTips">Tips</Link> page, or
                    <a href="https://www.sudokuwiki.org/" target="_blank" rel="noopener noreferrer"> Sudoku Wiki</a>.
                    <p>The instruction is subject to change or update.</p></span>
            </div>
        </div >

    </Modal >
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
