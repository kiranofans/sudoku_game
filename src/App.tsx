import { useState, useEffect, useCallback } from 'react';
import { generateSudoku, Difficulty } from './lib/generatesSudoku.ts';
import './App.css';

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

  // 初始化游戏
  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  // 计时器
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

    // 更新选中单元格和十字高亮
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

  // 键盘控制
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
    setBoard(initialBoard.map(row => [...row]));
    setNotes(Array(9).fill(null).map(() => Array(9).fill(null).map(() => new Set())));
    setTime(0);
    setMistakes(0);
    setIsGameOver(false);
    setCrossHighlight({ row: null, col: null });
    updateNumberCounts(initialBoard);
  }, [initialBoard, updateNumberCounts]);

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

  function setVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Run on load
setVh();

// Run again on resize and orientation change
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);


  return (
    <html>
      <body>
        <div className="wrapper">
          <div className="sudoku-app">
            <div className="logo-title-container">
              <img src="logo_sudoku1.png" alt="Logo" className="logo" />
              <h1 className='game-title'>Sudoku Game</h1>
            </div>
            <div className="game-controls">
              <select
                value={difficulty}
                onChange={(e) => {
                  setDifficulty(e.target.value as Difficulty);
                  startNewGame();
                }}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
              </select>

              <button onClick={startNewGame}>New Game</button>
            </div>

            <div className="game-container">
              <div className="board-section">
                <div className="game-info">
                  <div>
                    <div className="info-icon timer-icon">
                      <div className="bell-left"></div>
                      <div className="bell-right"></div>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatTime(time)}</div>
                  </div>

                  <div>
                    <div className="info-icon mistake-icon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mistakes}/3</div>
                  </div>

                  <div>
                    <div className="info-icon hint-icon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{hintsRemaining}</div>
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

              <div className="control-panel">

              
                <div className="counts-and-actionbtn">
                    {/*Wrap counts + actions together */}
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
                  <div className="action-buttons">
                    <button
                      className={isPencilMode ? 'active' : ''}
                      onClick={() => setIsPencilMode(!isPencilMode)}>
                      <div className="btn-pencil" ></div>
                    </button>
                    <button onClick={handleEraser}>
                      <div className='btn-eraser'></div>
                    </button>
                    <button onClick={handleHint} disabled={hintsRemaining <= 0}>
                      ({hintsRemaining})
                      <div className='btn-hint'></div>
                    </button>
                    <button onClick={handleReset}>
                      <div className="btn-reset"></div>
                    </button>
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

            {isGameOver && (
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
            )}
          </div>
        </div>
      </body>
    </html>
  );
}

export default App;