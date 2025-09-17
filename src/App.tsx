import { useState, useEffect, useCallback, useRef } from 'react';
import { generateSudoku, Difficulty } from './lib/generatesSudoku.ts';

import ReactGA from 'react-ga4';
import './App.css';

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
  const [crossHighlight, setCrossHighlight] = useState<{
    row: number | null;
    col: number | null;
  }>({ row: null, col: null });

  const currentYear = new Date().getFullYear();

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

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isGameOver) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
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

        if (checkBoardComplete(newBoard)) {
          setIsGameOver(true);
        }
      } else {
        const newBoard = [...board];
        newBoard[row][col] = num;
        setBoard(newBoard);

        setMistakes(prev => {
          const newMistakes = prev + 1;
          if (newMistakes >= 3) {
            setIsGameOver(true);
          }
          return newMistakes;
        });
      }
    }
    setCrossHighlight({ row, col });
  }, [selectedCell, isGameOver, isPencilMode, notes, solution, board, initialBoard, updateCountsAfterInput]);

  // Keyboard control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;

      if (e.key >= '1' && e.key <= '9') {
        handleNumberInput(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleEraser();
      } else if (e.key === 'p') {
        setIsPencilMode(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNumberInput, selectedCell]);

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
          <h2 className='game-title'>Sudoku Game</h2>
        </div>
        <div className='controls-row'>
          <select className='difficulty-dropdown'
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value as Difficulty);
              ReactGA.event({
                category: 'Game',
                action: 'change_difficulty',
                label: difficulty
              });
              startNewGame();
            }}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="expert">Expert</option>
          </select>

        </div>


        {/* How to Play icon button */}
        <button onClick={() => {
          setShowInstructions(true);
          ReactGA.event({
            category: 'Instruction',
            action: 'Instruction button clicks',
            label: showInstructions ? "Opened" : "Didn't Open",
          });
        }}
          className="how-to-play-btn">?
        </button>
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

        {/* Instructions - only show if not loading */}
        {showInstructions && !isLoading && (
          <div className="instructions-overlay">
            <div className="instructions-content">
              <button className='instruct-close-btn' onClick={() => setShowInstructions(false)}></button>
              <h3 className='content-title'>How to Play Sudoku</h3>

              <h4>Quick Guide</h4>
              <p>Fill each row, column, and 3×3 box with numbers 1–9 without repeating.</p>

              <h4>Detailed Guide</h4>
              <ol type='1'>
                <li>Click a cell to select it.</li>
                <li>Type a number (1–9) or use the number pad to fill it in.</li>
                <li>Switch to <b>Pencil Mode</b> to make notes for possible numbers.</li>
                <li>You can use up to 3 hints during the game.</li>
                <li>The game ends after 3 mistakes or when the puzzle is solved.</li>
              </ol>

            </div>
          </div>
        )}
        <div className="game-container">
          <div className="board-section">
            <div className="game-info">
              <div>
                <div className="info-icon timer-icon">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatTime(time)}
                </div>
              </div>

              <div>
                <div className="info-icon mistake-icon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mistakes}/3</div>
              </div>

              <div>
                <button className="new-game-btn" onClick={startNewGame}>New Game</button>

                {/* <div className="info-icon hint-icon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{hintsRemaining}</div> */}
              </div>
            </div>

            <div className="sudoku-board">
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                  {row.map((cell, colIndex) => {
                    const isCrossRow = crossHighlight.row === rowIndex;
                    const isCrossCol = crossHighlight.col === colIndex;
                    const isSameBox =
                      crossHighlight.row !== null &&
                      crossHighlight.col !== null &&
                      Math.floor(rowIndex / 3) === Math.floor(crossHighlight.row / 3) &&
                      Math.floor(colIndex / 3) === Math.floor(crossHighlight.col / 3);
                    const isSelected = selectedCell?.toString() === [rowIndex, colIndex].toString();
                    const isConflict = cell !== null &&
                      selectedCell &&
                      cell === board[selectedCell[0]][selectedCell[1]] &&
                      cell !== solution[rowIndex][colIndex];

                    return (
                      <div
                        key={colIndex}
                        className={`
                        cell 
                        ${initialBoard[rowIndex][colIndex] !== null ? 'initial' : ''}
                        ${isSelected ? 'selected' : ''}
                        ${rowIndex % 3 === 2 ? 'bottom-border' : ''}
                        ${colIndex % 3 === 2 ? 'right-border' : ''}
                        ${cell !== null && initialBoard[rowIndex][colIndex] === null && cell !== solution[rowIndex][colIndex] ? 'wrong' : ''}
                        ${(isCrossRow || isCrossCol || isSameBox) ? 'cross-highlight' : ''}
                        ${isConflict ? 'highlighted-conflict' : ''}
                      `}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                      >
                        {cell !== null ? (
                          cell
                        ) : (
                          <div className="notes-grid">
                            {Array.from({ length: 9 }, (_, i) => i + 1).map(num => (
                              <div
                                key={num}
                                className={`note ${notes[rowIndex][colIndex]?.has(num) ? 'visible' : ''}`}
                              >
                                {notes[rowIndex][colIndex]?.has(num) ? num : ''}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="counts-and-actionbtn">
            <div className="control-panel">

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

                  {hintsRemaining > 0 && (
                    <span className="hint-remain-badge" role="status" aria-live="polite">{hintsRemaining}</span>
                  )}

                  {/* visible top-right badge only when ad-mode (keeps "Ad" visible and also shows the badge) */}
                  <span className="hint-badge" role="status" aria-live="polite">
                    {hintsRemaining > 0 ? `${hintsRemaining}` : "Ad"}
                  </span>
                </button>
                <button onClick={handleReset} aria-label="Reset">
                  <div className="btn-reset"></div>
                </button>
              </div>
              <div className="horizontal-counts">

                {Array.from({ length: 9 }, (_, i) => i + 1).map(num => (
                  <div key={num} className="count-item">
                    <div className={`number ${numberCounts[num] <= 0 ? 'completed' : ''}`}>
                      {num}
                    </div>
                    <div className="remaining"> {numberCounts[num]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="number-pad">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => handleNumberInput(num)}
                  disabled={isGameOver || numberCounts[num] <= 0}
                  className={numberCounts[num] <= 0 ? 'completed' : ''}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer
        style={{
          width: "100%",
          padding: "1rem 0",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          color: "#333",
          position: "fixed",
          bottom: 0,
          left: 0,
        }}
      >
        &copy; {currentYear} Kira's Sudoku Game. All rights reserved.
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
    </div>
  );
}

export default App;