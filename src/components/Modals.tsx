import React from 'react';
import Dropdown from './Dropdown';

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
            <div className="instructions-content space-y-2 max-w-400" onClick={(e) => e.stopPropagation()}>
                {closeable && <button className="instruct-close-btn" onClick={onClose} aria-label="Close modal"></button>}
                <h3 className="content-title">{title}</h3>
                {children}
            </div>
        </div>
    );
};

export const InstructionsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title={<b className="text-2xl">Quick Play Guide</b>}>
        <div className="w-full space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed mt-4 mb-4">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-2 dark:border-blue-900/50 dark:bg-blue-950/30">
                <h3 className="text-center mb-1 font-semibold text-blue-900 dark:text-blue-200 mx-w-500">
                    Objective
                </h3>
                <p className='text-center'>
                    To win, fill every <a href="">domain</a> (row, column, and 3×3 box) with the numbers
                    <strong>1–9</strong>, using each number only once.
                </p>
            </div>
        </div>

        <ol className="space-y-3 ml-6 mr-6 text-left list-decimal">
            <li>
                <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                    Select a cell
                </p>
                <p>
                    Click or tap an empty cell. SudokuPlays highlights its row, column,
                    and 3×3 box to help you find possible numbers.
                </p>
            </li>

            <li>
                <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                    Enter a number
                </p>
                <p>
                    Use the keyboard or the on-screen number pad to enter a number from
                    <strong>1–9</strong>.
                </p>
            </li>

            <li>
                <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                    Use Pencil Mode
                </p>
                <p>
                    Not sure which number fits? Turn on
                    <strong>Pencil Mode</strong> to add possible numbers to a cell.
                </p>
            </li>

            <li>
                <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                    Made a mistake?
                </p>
                <p>
                    Use the <strong>Eraser</strong> to remove an entered number or
                    pencil note.
                </p>
            </li>

            <li>
                <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                    Stuck?
                </p>
                <p>
                    You can use up to <strong>3 hints</strong> per game to help solve
                    tricky cells.
                </p>
            </li>

            <li>
                <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                    Watch your mistakes
                </p>
                <p>
                    The game ends after <strong>10 mistakes</strong>.
                </p>
            </li>

            <li>
                <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                    Win the game
                </p>
                <p>
                    Fill all empty cells correctly and complete the puzzle without any
                    red numbers showing.
                </p>
            </li>
        </ol>

        <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
            <a
                href="/how-sudokuplays-works"
                className="inline-flex items-center font-medium text-blue-600 transition hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            >
                Learn how SudokuPlays works
                <svg
                    className="ml-1 h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M7.21 14.77a.75.75 0 0 1 .02-1.06L10.94 10 7.23 6.29a.75.75 0 1 1 1.06-1.06l4.24 4.24a.75.75 0 0 1 0 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0Z"
                        clip-rule="evenodd"
                    />
                </svg>
            </a>
        </div>
    </Modal >
);

export const InstructionsDropdown: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
    <Dropdown
        isOpen={isOpen}
        onClose={onClose}
        className="absolute top-[120%] right-0 z-[10010]"
    >
        <div
            className="w-[min(92vw,520px)] max-h-[80vh] overflow-y-auto p-5 text-left"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Quick Play Guide
                </h3>
            </div>
            <div className="w-full space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed mt-4 mb-4">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-2 dark:border-blue-900/50 dark:bg-blue-950/30">
                    <h3 className="text-center mb-1 font-semibold text-blue-900 dark:text-blue-200 mx-w-500">
                        Objective
                    </h3>
                    <p className='text-center'>
                        To win, fill every <a href="">domain</a> (row, column, and 3×3 box) with the numbers
                        <strong>1–9</strong>, using each number only once.
                    </p>
                </div>
            </div>

            <ol className="space-y-3 ml-6 mr-6 text-left list-decimal">
                <li>
                    <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                        Select a cell
                    </p>
                    <p>
                        Click or tap an empty cell. SudokuPlays highlights its row, column,
                        and 3×3 box to help you find possible numbers.
                    </p>
                </li>

                <li>
                    <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                        Enter a number
                    </p>
                    <p>
                        Use the keyboard or the on-screen number pad to enter a number from
                        <strong>1–9</strong>.
                    </p>
                </li>

                <li>
                    <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                        Use Pencil Mode
                    </p>
                    <p>
                        Not sure which number fits? Turn on
                        <strong>Pencil Mode</strong> to add possible numbers to a cell.
                    </p>
                </li>

                <li>
                    <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                        Made a mistake?
                    </p>
                    <p>
                        Use the <strong>Eraser</strong> to remove an entered number or
                        pencil note.
                    </p>
                </li>

                <li>
                    <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                        Stuck?
                    </p>
                    <p>
                        You can use up to <strong>3 hints</strong> per game to help solve
                        tricky cells.
                    </p>
                </li>

                <li>
                    <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                        Watch your mistakes
                    </p>
                    <p>
                        The game ends after <strong>10 mistakes</strong>.
                    </p>
                </li>

                <li>
                    <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                        Win the game
                    </p>
                    <p>
                        Fill all empty cells correctly and complete the puzzle without any
                        red numbers showing.
                    </p>
                </li>
            </ol>

            <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
                <a
                    href="/how-sudokuplays-works"
                    className="inline-flex items-center font-medium text-blue-600 transition hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                >
                    Learn how SudokuPlays works
                    <svg
                        className="ml-1 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.21 14.77a.75.75 0 0 1 .02-1.06L10.94 10 7.23 6.29a.75.75 0 1 1 1.06-1.06l4.24 4.24a.75.75 0 0 1 0 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </a>
            </div>
        </div>
    </Dropdown >
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
export const PauseModal: React.FC<{ isOpen: boolean; onResume: () => void }> = ({ isOpen, onResume }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10005] flex justify-center items-center p-6">
            <div
                className="bg-white/95 dark:bg-[#1a1a1a]/95 w-full max-w-[340px] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden animate-[slideUpFade_0.4s_cubic-bezier(0.16,1,0.3,1)] backdrop-blur-2xl border border-white/20 dark:border-white/10 p-8 text-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-5xl mb-4 animate-pulse">⏸️</div>
                <h3 className="text-xl font-black mb-4 text-black dark:text-white">Game Paused</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
                    The game is now paused. Click/Tap on Resume Game button whenever you’re ready to continue.                </p>
                <button
                    onClick={onResume}
                    className="new-game-btn"
                    style={{ padding: '14px 24px', fontSize: '1.1rem' }}
                >
                    Resume Game
                </button>
            </div>
        </div>
    );
};
