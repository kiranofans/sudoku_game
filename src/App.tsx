import { useState, useEffect, useCallback, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { generateSudoku, Difficulty } from './lib/generatesSudoku.ts';
import { loadPersistedHints, savePersistedHints, loadPersistedScore, savePersistedScore } from './lib/persistenceStorage.ts';

import './App.css';
import Board from "./components/Board";
import { InstructionsModal, AdModal } from './components/Modals';
import GameStatusModal from './components/GameStatusModal';
import { ThemeProvider } from './components/ThemeContext';
import DifficultySelector from './components/DifficultySelector';
import Tooltip from './components/Tooltip';
import About from './pages/About';
import Contact from './pages/Contact';
import Faq from './pages/faq.tsx';
import SudokuTips from './pages/SudokuTips.tsx';
import Layout from './components/Layout';
import { useTimer } from './hooks/useTimer.ts';
import ChangeLog from './pages/ChangeLog.tsx';

type CellNotes = Set<number>;

function App() {
  const [board, setBoard] = useState<(number | null)[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [initialBoard, setInitialBoard] = useState<(number | null)[][]>([]);
  const [notes, setNotes] = useState<CellNotes[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [time, setTime] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hintsRemaining, setHintsRemaining] = useState(loadPersistedHints());
  const [isPencilMode, setIsPencilMode] = useState(false);
  const [numberCounts, setNumberCounts] = useState<{ [key: number]: number }>(
    Array.from({ length: 9 }, (_, i) => i + 1).reduce((acc, num) => ({ ...acc, [num]: 9 }), {})
  );
  const [score, setScore] = useState<number | null>(loadPersistedScore());
  const [crossHighlight, setCrossHighlight] = useState<{
    row: number | null;
    col: number | null;
  }>({ row: null, col: null });
  const [showAdModal, setShowAdModal] = useState(false);

  const highlightedNumber = selectedCell ? board[selectedCell[0]][selectedCell[1]] : null;

  const [isLoading, setIsLoading] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const [gameKey, setGameKey] = useState(0);
  const timer = useTimer(gameKey, isGameOver);

  /* loader */
  useEffect(() => {
    if (isLoading) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 95) progress = 95;
        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`;
        }
      }, 200);

      return () => clearInterval(interval);
    } else {
      if (progressRef.current) {
        progressRef.current.style.width = "100%";
        setTimeout(() => {
          if (progressRef.current) {
            progressRef.current.style.width = "0%";
          }
        }, 200);
      }
    }
  }, [isLoading]);

  /** Responseive Ui resize **/
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Run on load
    setVh();

    // Run again on resize and orientation change
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    // cleanup
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  // Initialize the game
  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  // Timer & Real-time Score Decay
  // useEffect(() => {
  //   let interval: NodeJS.Timeout;
  //   if (!isGameOver) {
  //     interval = setInterval(() => {
  //       setTime(prev => prev + 1);
  //       setScore(prev => {
  //         if (prev === null || prev <= 0) return prev;
  //         return Math.max(0, prev - 5);
  //       });
  //     }, 1000);
  //   }
  //   return () => clearInterval(interval);
  // }, [isGameOver]);

  // Persist hints
  useEffect(() => {
    savePersistedHints(hintsRemaining);
  }, [hintsRemaining]);

  useEffect(() => {
    savePersistedScore(score);
  }, [score]);


  const startNewGame = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const { puzzle, solution } = generateSudoku(difficulty);
      setBoard(puzzle);
      setSolution(solution);
      setInitialBoard(puzzle.map(row => [...row]));
      setNotes(Array(9).fill(null).map(() => Array(9).fill(null).map(() => new Set())));
      setSelectedCell(null);
      setTime(0);
      setGameKey(prev => prev + 1);//for countdown timer
      setMistakes(0);
      setScore(null);
      setIsGameOver(false);
      setIsPencilMode(false);
      setCrossHighlight({ row: null, col: null });
      updateNumberCounts(puzzle);
      setIsLoading(false);
    }, 300);
  }, [difficulty]);

  const updateNumberCounts = useCallback((currentBoard: (number | null)[][]) => {
    const counts: { [key: number]: number } = {};
    for (let num = 1; num <= 9; num++) counts[num] = 0;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const num = currentBoard[row][col];
        if (num !== null) counts[num]++;
      }
    }

    const newCounts: { [key: number]: number } = {};
    for (let num = 1; num <= 9; num++) {
      newCounts[num] = 9 - counts[num];
    }

    setNumberCounts(newCounts);
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (isGameOver) return;
    // Update cross style selection
    setSelectedCell([row, col]);
    setCrossHighlight({ row, col });

  };

  const updateCountsAfterInput = useCallback((num: number, increment: boolean) => {
    setNumberCounts(prev => {
      const newCounts = { ...prev };
      if (increment) {
        newCounts[num] = Math.min(newCounts[num] + 1, 9);
      } else {
        newCounts[num] = Math.max(newCounts[num] - 1, 0);
      }
      return newCounts;
    });
  }, []);

  const handleNumberInput = useCallback((num: number) => {
    if (!selectedCell || isGameOver) return;
    const [row, col] = selectedCell;

    if (initialBoard[row][col] !== null) return;

    if (isPencilMode) {
      const newNotes = [...notes];
      const cellNotes = new Set(newNotes[row][col]);

      if (cellNotes.has(num)) {
        cellNotes.delete(num);
      } else {
        cellNotes.add(num);
      }

      newNotes[row][col] = cellNotes;
      setNotes(newNotes);
    } else {
      const multiplier: number = ({
        'very-easy': 1,
        easy: 2,
        medium: 3,
        hard: 5,
        expert: 10
      } as Record<string, number>)[difficulty];

      if (num !== null) {
        const currentNum = board[row][col];
        if (currentNum !== null) {
          updateCountsAfterInput(currentNum, true);
        }

        if (solution[row][col] === num) {
          const newBoard = [...board];
          newBoard[row][col] = num;
          setBoard(newBoard);

          const newNotes = [...notes];
          newNotes[row][col] = new Set();
          setNotes(newNotes);

          updateCountsAfterInput(num, false);

          // Add incremental points for correct move
          setScore(prev => (prev || 0) + (100 * multiplier));

          if (checkBoardComplete(newBoard)) {
            setIsGameOver(true);
          }
        } else {
          const newBoard = [...board];
          newBoard[row][col] = num;
          setBoard(newBoard);

          // Subtract penalty for mistake
          setScore(prev => Math.max(0, (prev || 0) - (500 * multiplier)));

          setMistakes(prev => {
            const newMistakes = prev + 1;
            if (newMistakes >= 10) {
              setIsGameOver(true);
            }
            return newMistakes;
          });
        }
      }
    }
    setCrossHighlight({ row, col });
  }, [selectedCell, isGameOver, isPencilMode, notes, solution, board, initialBoard, updateCountsAfterInput, difficulty]);


  const handleEraser = useCallback(() => {
    if (!selectedCell || isGameOver) return;
    const [row, col] = selectedCell;

    if (initialBoard[row][col] !== null) return;

    const currentNum = board[row][col];
    if (currentNum !== null) {
      updateCountsAfterInput(currentNum, true);
    }

    const newBoard = [...board];
    newBoard[row][col] = null;
    setBoard(newBoard);

    const newNotes = [...notes];
    newNotes[row][col] = new Set();
    setNotes(newNotes);
    setCrossHighlight({ row, col });
  }, [selectedCell, isGameOver, initialBoard, board, notes, updateCountsAfterInput]);

  // Keyboard control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;
      const [row, col] = selectedCell;

      if (e.key >= '1' && e.key <= '9') {
        handleNumberInput(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleEraser();
      } else if (e.key === 'p') {
        setIsPencilMode(prev => !prev);
      } else if (e.key === 'ArrowUp') {
        const newRow = Math.max(0, row - 1);
        setSelectedCell([newRow, col]);
        setCrossHighlight({ row: newRow, col });
      } else if (e.key === 'ArrowDown') {
        const newRow = Math.min(8, row + 1);
        setSelectedCell([newRow, col]);
        setCrossHighlight({ row: newRow, col });
      } else if (e.key === 'ArrowLeft') {
        const newCol = Math.max(0, col - 1);
        setSelectedCell([row, newCol]);
        setCrossHighlight({ row, col: newCol });
      } else if (e.key === 'ArrowRight') {
        const newCol = Math.min(8, col + 1);
        setSelectedCell([row, newCol]);
        setCrossHighlight({ row, col: newCol });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNumberInput, selectedCell, handleEraser]);

  const handleHint = useCallback(() => {
    if (hintsRemaining <= 0 || !selectedCell || isGameOver) return;
    const [row, col] = selectedCell;

    if (initialBoard[row][col] !== null || board[row][col] === solution[row][col]) return;

    const num = solution[row][col];
    const currentNum = board[row][col];
    if (currentNum !== null) {
      updateCountsAfterInput(currentNum, true);
    }

    const newBoard = board.map(rowArr => [...rowArr]);
    newBoard[row][col] = num;
    setBoard(newBoard);

    setHintsRemaining(prev => prev - 1);
    updateCountsAfterInput(num, false);

    if (checkBoardComplete(newBoard)) {
      setIsGameOver(true);
    }
    setCrossHighlight({ row, col });
  }, [hintsRemaining, selectedCell, isGameOver, initialBoard, board, solution, updateCountsAfterInput]);


  const handleReset = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setBoard(initialBoard.map(row => [...row]));
      setNotes(Array(9).fill(null).map(() => Array(9).fill(null).map(() => new Set())));
      setTime(0);
      setGameKey(prev => prev + 1);//for timer
      setMistakes(0);
      setIsGameOver(false);
      setCrossHighlight({ row: null, col: null });
      updateNumberCounts(initialBoard);
      setIsLoading(false);
    }, 300);
  }, [initialBoard, updateNumberCounts]);


  const [showInstructions, setShowInstructions] = useState(false);

  const handleEarnHint = () => {
    setHintsRemaining(prev => prev + 1);
  };

  const checkBoardComplete = (currentBoard: (number | null)[][]) => {
    return currentBoard.every((row, i) =>
      row.every((cell, j) => cell !== null && cell === solution[i][j])
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Routes>
      <Route path="/" element={
        <Layout
          mobileScore={
            <div className="mobile-only-score">
              <div className="score-main-mobile">
                <span className="mobile-score-label">Score:</span>
                <span className="mobile-score-value">{score !== null ? score.toLocaleString() : "- - - -"}</span>
              </div>
              <div className="score-refresh-notice mobile-notice">Score refreshes every 24 hours</div>
            </div>
          }
          headerContent={
            <>
              <DifficultySelector
                difficulty={difficulty}
                onDifficultyChange={(newDifficulty) => {
                  setDifficulty(newDifficulty);
                }}
              />
              <Tooltip text="How to play">
                <button onClick={() => {
                  setShowInstructions(true);
                }}
                  className="how-to-play-btn"
                  aria-label="How to play"
                  title="How to play"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="how-to-icon-img">
                    <path d="M12.838 17.638C13.0793 17.396 13.2 17.1 13.2 16.75C13.2 16.4 13.0793 16.104 12.838 15.862C12.5967 15.62 12.3007 15.4993 11.95 15.5C11.5993 15.5007 11.3037 15.6217 11.063 15.863C10.8223 16.1043 10.7013 16.4 10.7 16.75C10.6987 17.1 10.8197 17.396 11.063 17.638C11.3063 17.88 11.602 18.0007 11.95 18C12.298 17.9993 12.594 17.8783 12.838 17.637M11.05 14.15H12.9C12.9 13.6 12.9627 13.1667 13.088 12.85C13.2133 12.5333 13.5673 12.1 14.15 11.55C14.5833 11.1167 14.925 10.704 15.175 10.312C15.425 9.92001 15.55 9.44934 15.55 8.9C15.55 7.96667 15.2083 7.25001 14.525 6.75001C13.8417 6.25001 13.0333 6.00001 12.1 6.00001C11.15 6.00001 10.3793 6.25001 9.788 6.75001C9.19667 7.25001 8.784 7.85001 8.55 8.55001L10.2 9.20001C10.2833 8.90001 10.471 8.57501 10.763 8.22501C11.055 7.87501 11.5007 7.70001 12.1 7.70001C12.6333 7.70001 13.0333 7.846 13.3 8.138C13.5667 8.43 13.7 8.75067 13.7 9.10001C13.7 9.43334 13.6 9.746 13.4 10.038C13.2 10.33 12.95 10.6007 12.65 10.85C11.9167 11.5 11.4667 11.9917 11.3 12.325C11.1333 12.6583 11.05 13.2667 11.05 14.15ZM12 22C10.6167 22 9.31667 21.7377 8.1 21.213C6.88334 20.6883 5.825 19.9757 4.925 19.075C4.025 18.1743 3.31267 17.116 2.788 15.9C2.26333 14.684 2.00067 13.384 2 12C1.99933 10.616 2.262 9.31601 2.788 8.10001C3.314 6.88401 4.02633 5.82567 4.925 4.92501C5.82367 4.02434 6.882 3.31201 8.1 2.78801C9.318 2.26401 10.618 2.00134 12 2.00001C13.382 1.99867 14.682 2.26134 15.9 2.78801C17.118 3.31467 18.1763 4.02701 19.075 4.92501C19.9737 5.82301 20.6863 6.88134 21.213 8.10001C21.7397 9.31867 22.002 10.6187 22 12C21.998 13.3813 21.7353 14.6813 21.212 15.9C20.6887 17.1187 19.9763 18.177 19.075 19.075C18.1737 19.973 17.1153 20.6857 15.9 21.213C14.6847 21.7403 13.3847 22.0027 12 22Z" fill="currentColor" />
                  </svg>
                </button>
              </Tooltip>
            </>
          }
        >

          <div className="sudoku-app">
            {/* Wrap themain game container in scrollable div */}
            {isLoading && (
              <div className="loading-overlay">
                <div className="loading-bar"
                  style={{ width: isLoading ? '100%' : '0%' }}>
                  <div className="loading-progress"></div>
                </div>
              </div>
            )}

            {/* Modals */}
            <InstructionsModal
              isOpen={showInstructions && !isLoading}
              onClose={() => setShowInstructions(false)}
            />
            <AdModal
              isOpen={showAdModal}
              onClose={() => setShowAdModal(false)}
              onAdComplete={handleEarnHint}
            />
            <div className="game-container">
              <div className="board-section">
                <div className="game-info">
                  <div>
                    <div className="info-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="timer-icon-svg">
                        <path d="M9 3V1H15V3H9ZM11 14H13V8H11V14ZM8.512 21.288C7.42067 20.8127 6.46667 20.1667 5.65 19.35C4.83333 18.5333 4.18767 17.579 3.713 16.487C3.23833 15.395 3.00067 14.2327 3 13C2.99933 11.7673 3.237 10.6047 3.713 9.512C4.189 8.41933 4.83467 7.46533 5.65 6.65C6.46533 5.83467 7.41967 5.189 8.513 4.713C9.60633 4.237 10.7687 3.99933 12 4C13.0333 4 14.025 4.16667 14.975 4.5C15.925 4.83333 16.8167 5.31667 17.65 5.95L19.05 4.55L20.45 5.95L19.05 7.35C19.6833 8.18333 20.1667 9.075 20.5 10.025C20.8333 10.975 21 11.9667 21 13C21 14.2333 20.7623 15.396 20.287 16.488C19.8117 17.58 19.166 18.534 18.35 19.35C17.534 20.166 16.5797 20.812 15.487 21.288C14.3943 21.764 13.232 22.0013 12 22C10.768 21.9987 9.60533 21.7613 8.512 21.288Z" fill="currentColor" />
                      </svg>
                      <span>{formatTime(timer.timeLeft)}</span>

                      {/* Pause/Play timer countdown BUTTON */}
                      <svg
                        onClick={() =>
                          timer.isRunning ? timer.pause() : timer.start()
                        }
                        className="w-7 h-7 cursor-pointer hover:scale-100 hover:stroke-blue-700 dark:gray-400"
                        viewBox="0 0 48 48"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {/* outer circle outline */}
                        <circle cx="24" cy="24" r="20" />

                        {/* icon */}
                        {timer.isRunning ? (
                          // pause icon (black lines)
                          <>
                            <line x1="18" y1="16" x2="18" y2="32" />
                            <line x1="30" y1="16" x2="30" y2="32" />
                          </>
                        ) : (
                          // play icon (triangle outline)
                          <polygon points="18,14 36,24 18,34" />
                        )}
                      </svg>
                    </div>
                  </div>

                  <div>
                    <div className="info-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mistake-icon-svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{mistakes}/10</span>
                    </div>
                  </div>

                  <div>
                    <button className="new-game-btn" onClick={startNewGame}>New Game</button>
                  </div>
                </div>
                <Board
                  board={board}
                  initialBoard={initialBoard}
                  notes={notes}
                  selectedCell={selectedCell}
                  onCellClick={handleCellClick}
                  solution={solution}
                  crossHighlight={crossHighlight}
                  highlightedNumber={highlightedNumber}
                />
              </div>

              <div className="counts-and-actionbtn">
                <div className="control-panel">
                  <div className="score-widget desktop-only-score">
                    <div className="score-main">
                      <span className="score-label">Score:</span>
                      <span className="score-value">{score !== null ? score.toLocaleString() : "- - - -"}</span>
                    </div>
                    <div className="score-refresh-notice">Score refreshes every 24 hours</div>
                  </div>
                  <div className="action-buttons">
                    <Tooltip text="Pencil Mode">
                      <button
                        className={isPencilMode ? 'active' : ''}
                        onClick={() => setIsPencilMode(!isPencilMode)}
                        aria-pressed={isPencilMode}
                        aria-label="Toggle pencil mode">
                        <div className="btn-pencil" title="Edit">
                        </div>
                      </button>
                    </Tooltip>

                    <Tooltip text="Eraser">
                      <button onClick={handleEraser}>
                        <div className='btn-eraser'></div>
                      </button>
                    </Tooltip>

                    <Tooltip text="Get Hint">
                      <button onClick={() => {
                        if (hintsRemaining > 0) {
                          handleHint();

                        } else {
                          // show ad logic
                          // setShowAdModal(true);
                          alert("The ads are currenly disabled for technical reason. \nPlease check back later.");
                        }
                      }}
                        className={`hint-ad ${hintsRemaining <= 0 ? 'ad-mode' : ''}`}
                        aria-label={hintsRemaining > 0 ? `Hints remaining ${hintsRemaining}` : 'Watch ad to earn 1 hint'}
                      >
                        <div className='btn-hint' ></div>

                        {/* Unified badge for both hints count and Ad state */}
                        <span className="hint-badge" role="status" aria-live="polite">
                          {hintsRemaining > 0 ? `${hintsRemaining}` : "Ad"}
                        </span>
                      </button>
                    </Tooltip>

                    <Tooltip text="Reset Game">
                      <button onClick={handleReset} aria-label="Reset">
                        <div className="btn-reset"></div>
                      </button>
                    </Tooltip>
                  </div>
                  <div className="number-pad">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                      <button
                        key={num}
                        onClick={() => handleNumberInput(num)}
                        disabled={isGameOver || numberCounts[num] <= 0}
                        className={numberCounts[num] <= 0 ? 'completed' : ''}
                      >
                        <span className="number-value">{num}</span>
                        <span className="count-badge desktop-only-count">{numberCounts[num]}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mobile-only-counts-row">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                      <div key={num} className={`mobile-count-item ${numberCounts[num] <= 0 ? 'completed' : ''}`}>
                        {numberCounts[num]}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* <AboutSudoku /> */}

          </div>
          {
            <GameStatusModal
              isOpen={isGameOver}
              status={mistakes < 10 ? 'won' : 'lost'}
              onClose={() => {
                setIsGameOver(false);
                startNewGame();
              }}
              time={formatTime(time)}
              score={score}
              difficulty={difficulty}
            />
          }
        </Layout>
      } />
      {/* Routes */}
      <Route path="/changeLog" element={<ChangeLog />} />
      <Route path="/sudokuTips" element={<SudokuTips />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

function setGameKey(arg0: (v: any) => any) {
  throw new Error('Function not implemented.');
}
