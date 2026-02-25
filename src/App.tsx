import { useState, useEffect, useCallback, useRef } from 'react';
import { generateSudoku, Difficulty } from './lib/generatesSudoku.ts';

import ReactGA from 'react-ga4';
import './App.css';
import Board from "./components/Board";
import { AboutModal, ContactModal, InstructionsModal } from './components/Modals';
import { ThemeProvider } from './components/ThemeContext';
import ThemeSelector from './components/ThemeSelector';
import DifficultySelector from './components/DifficultySelector';

{/* Set google analytic with Vite container */ }
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

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
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [isPencilMode, setIsPencilMode] = useState(false);
  const [numberCounts, setNumberCounts] = useState<{ [key: number]: number }>(
    Array.from({ length: 9 }, (_, i) => i + 1).reduce((acc, num) => ({ ...acc, [num]: 9 }), {})
  );
  const [score, setScore] = useState<number | null>(null);
  const [crossHighlight, setCrossHighlight] = useState<{
    row: number | null;
    col: number | null;
  }>({ row: null, col: null });

  const currentYear = new Date().getFullYear();

  const highlightedNumber = selectedCell ? board[selectedCell[0]][selectedCell[1]] : null;

  // const [isMobileView, setIsMobileView] = useState(false);


  // Google Analytic setup & init
  useEffect(() => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    ReactGA.send({ hitType: 'pageview', page: `/game/${difficulty}` });
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

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
        }, 300);
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
    ReactGA.event({
      category: 'Game',
      action: 'start_new_game',
      label: difficulty
    });
  }, [difficulty]);

  // Timer & Real-time Score Decay
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isGameOver) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
        setScore(prev => {
          if (prev === null || prev <= 0) return prev;
          return Math.max(0, prev - 5);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameOver]);


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
      setMistakes(0);
      setScore(null);
      setIsGameOver(false);
      setHintsRemaining(3);
      setIsPencilMode(false);
      setCrossHighlight({ row: null, col: null });
      updateNumberCounts(puzzle);
      setIsLoading(false);
    }, 300);
    ReactGA.event({
      category: 'Game',
      action: 'start_new_game',
      label: difficulty
    });
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
      const multiplier = {
        'very-easy': 1,
        easy: 2,
        medium: 3,
        hard: 5,
        expert: 10
      }[difficulty];

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
  }, [selectedCell, isGameOver, isPencilMode, notes, solution, board, initialBoard, updateCountsAfterInput]);


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

    if (initialBoard[row][col] !== null || board[row][col] !== null) return;

    const num = solution[row][col];
    const currentNum = board[row][col];
    if (currentNum !== null) {
      updateCountsAfterInput(currentNum, true);
    }

    const newBoard = [...board];
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
      setMistakes(0);
      setIsGameOver(false);
      setCrossHighlight({ row: null, col: null });
      updateNumberCounts(initialBoard);
      setIsLoading(false);
    }, 300);
  }, [initialBoard, updateNumberCounts]);


  const [showInstructions, setShowInstructions] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

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
    <div className="wrapper">
      <header className="menu-bar">
        <div className="logo-title-container">
          <img src="logo_sudoku1.png" alt="Logo" className="logo" />
          <h2 className='game-title'>Sudoku</h2>
        </div>
        <div className='controls-row'>
          <DifficultySelector
            difficulty={difficulty}
            onDifficultyChange={(newDifficulty) => {
              setDifficulty(newDifficulty);
              ReactGA.event({
                category: 'Game',
                action: 'change_difficulty',
                label: newDifficulty
              });
              startNewGame();
            }}
          />
          <ThemeSelector />

          <button onClick={() => {
            setShowInstructions(true);
            ReactGA.event({
              category: 'Instruction',
              action: 'Instruction button clicks',
              label: showInstructions ? "Opened" : "Didn't Open",
            });
          }}
            className="how-to-play-btn"
            aria-label="How to play"
            title="How to play"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="how-to-icon-img">
              <path d="M12.838 17.638C13.0793 17.396 13.2 17.1 13.2 16.75C13.2 16.4 13.0793 16.104 12.838 15.862C12.5967 15.62 12.3007 15.4993 11.95 15.5C11.5993 15.5007 11.3037 15.6217 11.063 15.863C10.8223 16.1043 10.7013 16.4 10.7 16.75C10.6987 17.1 10.8197 17.396 11.063 17.638C11.3063 17.88 11.602 18.0007 11.95 18C12.298 17.9993 12.594 17.8783 12.838 17.637M11.05 14.15H12.9C12.9 13.6 12.9627 13.1667 13.088 12.85C13.2133 12.5333 13.5673 12.1 14.15 11.55C14.5833 11.1167 14.925 10.704 15.175 10.312C15.425 9.92001 15.55 9.44934 15.55 8.9C15.55 7.96667 15.2083 7.25001 14.525 6.75001C13.8417 6.25001 13.0333 6.00001 12.1 6.00001C11.15 6.00001 10.3793 6.25001 9.788 6.75001C9.19667 7.25001 8.784 7.85001 8.55 8.55001L10.2 9.20001C10.2833 8.90001 10.471 8.57501 10.763 8.22501C11.055 7.87501 11.5007 7.70001 12.1 7.70001C12.6333 7.70001 13.0333 7.846 13.3 8.138C13.5667 8.43 13.7 8.75067 13.7 9.10001C13.7 9.43334 13.6 9.746 13.4 10.038C13.2 10.33 12.95 10.6007 12.65 10.85C11.9167 11.5 11.4667 11.9917 11.3 12.325C11.1333 12.6583 11.05 13.2667 11.05 14.15ZM12 22C10.6167 22 9.31667 21.7377 8.1 21.213C6.88334 20.6883 5.825 19.9757 4.925 19.075C4.025 18.1743 3.31267 17.116 2.788 15.9C2.26333 14.684 2.00067 13.384 2 12C1.99933 10.616 2.262 9.31601 2.788 8.10001C3.314 6.88401 4.02633 5.82567 4.925 4.92501C5.82367 4.02434 6.882 3.31201 8.1 2.78801C9.318 2.26401 10.618 2.00134 12 2.00001C13.382 1.99867 14.682 2.26134 15.9 2.78801C17.118 3.31467 18.1763 4.02701 19.075 4.92501C19.9737 5.82301 20.6863 6.88134 21.213 8.10001C21.7397 9.31867 22.002 10.6187 22 12C21.998 13.3813 21.7353 14.6813 21.212 15.9C20.6887 17.1187 19.9763 18.177 19.075 19.075C18.1737 19.973 17.1153 20.6857 15.9 21.213C14.6847 21.7403 13.3847 22.0027 12 22Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </header>
      <hr className="divider" />

      <div className="sudoku-app">
        {/* Wrap themain game container in scrollable div */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-bar"
              style={{ width: isLoading ? '100%' : '0%' }}>
              <div className="loading-progress"></div>
            </div>
            {/* <div className="loading-text">Loading...</div> */}
          </div>
        )}

        {/* Modals */}
        <InstructionsModal
          isOpen={showInstructions && !isLoading}
          onClose={() => setShowInstructions(false)}
        />
        <AboutModal
          isOpen={showAboutModal}
          onClose={() => setShowAboutModal(false)}
        />
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
        {/* <div className={`sudoku-app ${isMobileView ? 'mobile-layout' : 'web-layout'}`}> */}
        <div className="game-container">
          <div className="board-section">
            <div className="game-info">
              <div>
                <div className="info-icon timer-icon">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatTime(time)}
                </div>
              </div>

              <div>
                <div className="info-icon mistake-icon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mistakes}/10</div>
              </div>

              <div>
                <button className="new-game-btn" onClick={startNewGame}>New Game</button>

                {/* <div className="info-icon hint-icon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{hintsRemaining}</div> */}
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
              <div className="score-widget">
                <span className="score-label">Score:</span>
                <span className="score-value">{score !== null ? score.toLocaleString() : "- - - -"}</span>
              </div>
              <div className="action-buttons">
                <button
                  className={isPencilMode ? 'active' : ''}
                  onClick={() => setIsPencilMode(!isPencilMode)}
                  aria-pressed={isPencilMode}
                  aria-label="Toggle pencil mode">
                  <div className="btn-pencil" title="Edit">
                  </div>
                </button>
                <button onClick={handleEraser}>
                  <div className='btn-eraser'></div>
                </button>

                <button onClick={() => {
                  if (hintsRemaining > 0) {
                    handleHint();

                  } else {
                    // show ad logic
                    alert("The app is currently in testing!");
                    setHintsRemaining(1); // for example, give 1 extra hint after ad
                  }
                }}
                  className={`hint-ad ${hintsRemaining <= 0 ? 'ad-mode' : ''}`}
                  aria-label={hintsRemaining > 0 ? `Hints remaining ${hintsRemaining}` : 'Watch ad to earn 1 hint'}
                >
                  <div className='btn-hint' >
                    {/* <img className="ic-hint" src="ic_hint.svg"></img> */}
                  </div>{/* contains hint icon*/}

                  {/* Unified badge for both hints count and Ad state */}
                  <span className="hint-badge" role="status" aria-live="polite">
                    {hintsRemaining > 0 ? `${hintsRemaining}` : "Ad"}
                  </span>
                </button>
                <button onClick={handleReset} aria-label="Reset">
                  <div className="btn-reset"></div>
                </button>
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
                    <span className="count-badge">{numberCounts[num]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="site-footer">
        <span>&copy; {currentYear}Sudoku Game. All rights reserved.</span>
        <div className="footer-links">
          <button className="footer-btn" onClick={() => {
            setShowAboutModal(true);
            ReactGA.event({
              category: 'Footer',
              action: 'About button clicks',
            });
          }}>About</button>
          <button className="footer-btn" onClick={() => {
            setShowContactModal(true);
            ReactGA.event({
              category: 'Footer',
              action: 'Contact button clicks',
            });
          }}>Contact</button>
        </div>
      </footer>
      {
        isGameOver && (
          <div className="game-over-overlay">
            <div className="game-over-content">
              <div className="game-over-message">
                {mistakes >= 3 ? 'Game Over!' : 'Congratulations! You won!'}
              </div>
              <button className="play-again" onClick={startNewGame}>
                Play Again
              </button>
            </div>
          </div>
        )
      }
    </div >
  );
}

export default function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}