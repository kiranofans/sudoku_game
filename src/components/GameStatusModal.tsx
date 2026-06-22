import React from 'react';
import ShareBoxes from './ShareBoxes';

interface GameStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    status: 'won' | 'lost';
    time: string;
    score: number | null;
    difficulty: string;
    scoreBreakdown?: {
        gross: number;
        penalty: number;
        bonus: number;
        multiplier: number;
        time: number;
    } | null;
}

const GameStatusModal: React.FC<GameStatusModalProps> = ({ isOpen, onClose, status, time, score, difficulty, scoreBreakdown }) => {
    if (!isOpen) return null;

    const tips = [
        "The Slicing and Dicing Technique: Instead of looking at the whole grid, focus on a chute (three vertical or horizontal blocks in a row).",
        "Try scanning rows and columns first to find 'naked singles' — cells where only one number can fit.",
        "Use pencil marks to keep track of possibilities in empty cells. It's a game-changer for harder puzzles!",
        "Focus on 3x3 blocks that are almost full. They often hold the key to the next move.",
        "Don't guess! Every Sudoku puzzle has a logical solution that doesn't require guessing."
    ];

    const isWon = status === 'won';
    const randomTip = tips[0];

    return (
        <div className="fixed inset-0 bg-black/80 flex flex-col justify-center items-center z-[9999] p-4 backdrop-blur-[4px]">
            <h2 className="text-[clamp(2.5rem,8vw,4rem)] font-black text-white mb-2 text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                {isWon ? 'Congratulations' : 'Game Over'}
            </h2>
            <div className="relative flex flex-row justify-center items-center w-[48%]">

                <div className="text-4xl mb-6 animate-bounce">
                    {isWon ? '🎉🥳🎊' : '😞❌🚫'}

                </div>

            </div>

            <div className="bg-white dark:bg-[#1a1a1a] w-full max-w-[420px] rounded-[24px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)] text-center text-[#333] dark:text-[#eee]">
                <div className="relative flex flex-row justify-center items-center w-full">
                    <svg onClick={() => onClose()}
                        className="absolute -right-4 -top-4 dark:text-gray-500 cursor-pointer"
                        width="18" height="18" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.292787 0.305288C0.480314 0.117817 0.734622 0.0125018 0.999786 0.0125018C1.26495 0.0125018 1.51926 0.117817 1.70679 0.305288L6.99979 
                    5.59829L12.2928 0.305288C12.385 0.209778 12.4954 0.133596 12.6174 0.0811869C12.7394 0.0287779 12.8706 0.00119157 13.0034 3.77571e-05C13.1362 -0.00111606 13.2678 
                    0.0241854 13.3907 0.0744663C13.5136 0.124747 13.6253 0.199 13.7192 0.292893C13.8131 0.386786 13.8873 0.498438 13.9376 0.621334C13.9879 0.74423 14.0132 0.87591 14.012 
                    1.00869C14.0109 1.14147 13.9833 1.27269 13.9309 1.39469C13.8785 1.5167 13.8023 1.62704 13.7068 1.71929L8.41379 7.01229L13.7068 12.3053C13.8889 12.4939 13.9897 12.7465 
                    13.9875 13.0087C13.9852 13.2709 13.88 13.5217 13.6946 13.7071C13.5092 13.8925 13.2584 13.9977 12.9962 14C12.734 14.0022 12.4814 13.9014 12.2928 13.7193L6.99979 8.42629L1.70679 
                    13.7193C1.51818 13.9014 1.26558 14.0022 1.00339 14C0.741188 13.9977 0.490376 13.8925 0.304968 13.7071C0.11956 13.5217 0.0143906 13.2709 0.0121121 13.0087C0.00983372 12.7465 0.110629 
                    12.4939 0.292787 12.3053L5.58579 7.01229L0.292787 1.71929C0.105316 1.53176 0 1.27745 0 1.01229C0 0.747124 0.105316 0.492816 0.292787 0.305288Z" fill="black" />
                    </svg>
                    <h2 className="text-[1.75rem] font-extrabold mb-2 text-black dark:text-white">
                        {isWon ? 'Round Completed' : 'Mistake Limit Reached'}
                    </h2>
                </div>


                {!isWon && (
                    <p className="text-[#888] mb-6 font-medium">You have reached the mistake limit</p>
                )}

                <div className={`grid grid-cols-3 gap-4 ${isWon ? 'mb-6' : 'mb-6'}`}>
                    <div className="flex flex-col gap-1">
                        <span className="text-[0.75rem] text-[#888] font-bold uppercase tracking-wider">Time</span>
                        <span className="text-[1.1rem] font-black text-black dark:text-white">{time}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[0.75rem] text-[#888] font-bold uppercase tracking-wider">Final Score</span>
                        <span className="text-[1.1rem] font-black text-black dark:text-white">{score?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[0.75rem] text-[#888] font-bold uppercase tracking-wider">Difficulty</span>
                        <span className="text-[1.1rem] font-black text-black dark:text-white capitalize">{difficulty.replace('-', ' ')}</span>
                    </div>
                </div>

                {isWon && scoreBreakdown && (
                    <div className="bg-[#f8fafc] dark:bg-[#252525] rounded-[16px] p-4 mb-6 border border-[#e2e8f0] dark:border-[#333] text-left">
                        <h3 className="text-[0.75rem] font-black text-[#64748b] uppercase tracking-[0.1em] mb-3 border-b border-[#e2e8f0] dark:border-[#333] pb-1">
                            Score Breakdown
                        </h3>
                        <div className="space-y-2 text-[0.9rem]">
                            <div className="flex justify-between items-center text-[#444] dark:text-[#ccc] font-medium">
                                <span className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                    Gross Score
                                </span>
                                <span className="font-bold">{scoreBreakdown.gross.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-[#ef4444] font-medium">
                                <span className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                    Time Penalty
                                </span>
                                <span className="font-bold">-{scoreBreakdown.penalty.toLocaleString()}</span>
                            </div>
                            {scoreBreakdown.bonus > 0 && (
                                <div className="flex justify-between items-center text-blue-500 font-medium">
                                    <span className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                        Speed Bonus
                                    </span>
                                    <span className="font-bold">+{scoreBreakdown.bonus.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="pt-2 mt-1 border-t border-dashed border-[#cbd5e1] dark:border-[#444] text-[0.7rem] text-[#94a3b8] font-bold italic">
                                {scoreBreakdown.penalty === 0
                                    ? `Calculation: ${scoreBreakdown.gross} ${scoreBreakdown.bonus > 0 ? `+ ${scoreBreakdown.bonus} (Speed Bonus)` : '(No time penalty)'}`
                                    : `Calculation: ${scoreBreakdown.gross} - (${scoreBreakdown.time}s × ${scoreBreakdown.multiplier})`}
                            </div>
                        </div>
                    </div>
                )}
                {/* If the player won the game show the ShareBoxes component */}
                {isWon && (
                    <ShareBoxes
                        score={score ?? 0}
                        difficulty={difficulty}
                        timeUsed={time}
                        isGameCompleted={isWon ? true : false}
                    />
                )}

                <div className="relative border-t border-[#eee] dark:border-[#333] my-6 flex justify-center">
                    <span className="absolute -top-2.5 bg-white dark:bg-[#1a1a1a] px-2.5 text-[0.8rem] text-[#aaa] font-semibold uppercase">
                        {isWon ? 'Useful Tip' : 'Improve Your Game'}
                    </span>
                </div>

                <div className="bg-[#f0f7ff] dark:bg-[#1c252e] rounded-[16px] p-5 mb-2">
                    {isWon ? (
                        <p className="text-[0.95rem] leading-relaxed text-[#444] dark:text-[#bbb] font-medium">{randomTip}
                            <p className='pt-3'>
                                <span className='text-sm'>For more details, please visit <a href="/sudokuTips" className="text-[var(--num-pad-bg)] font-bold hover:underline inline-block">Tips</a></span>
                            </p>
                        </p>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-[0.95rem] p-0 leading-relaxed text-[#444] dark:text-[#bbb] font-medium">
                                Want to master Sudoku? Check out our pro strategies to reduce mistakes and solve puzzles faster!
                            </p>
                            <a
                                href="/sudokuTips"
                                className="text-[var(--num-pad-bg)] font-bold hover:underline inline-block"
                                onClick={onClose}
                            >
                                View Sudoku Tips &rarr;
                            </a>
                        </div>
                    )}
                </div>

                {/* If the player won the game do not show the button, if the player lost the game show teh Play Again button */}
                {!isWon && (
                    <button
                        className="w-full p-4 rounded-[50px] !bg-[#2c8fd1] hover:!bg-[#2980b9] !text-white text-[1.1rem] font-bold !border-none cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(44,143,209,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(44,143,209,0.4)] active:translate-y-0"
                        onClick={onClose}
                    >
                        Play Again
                    </button>
                )}
            </div>
        </div>
    );
};

export default GameStatusModal;
