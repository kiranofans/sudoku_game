import { useState, useEffect } from 'react';

export const useCompletedDomains = (
  board: (number | null)[][],
  solution: number[][],
  isLoading: boolean,
  isGameOver: boolean
) => {
  const [fixedCells, setFixedCells] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isLoading || isGameOver || board.length !== 9 || solution.length !== 9) return;

    let changed = false;
    const newlyFixed = new Set(fixedCells);

    // check rows
    for (let r = 0; r < 9; r++) {
      let rowComplete = true;
      for (let c = 0; c < 9; c++) {
        if (board[r]?.[c] === null || board[r]?.[c] !== solution[r]?.[c]) {
          rowComplete = false;
          break;
        }
      }
      if (rowComplete) {
        for (let c = 0; c < 9; c++) {
          const key = `${r},${c}`;
          if (!newlyFixed.has(key)) {
            newlyFixed.add(key);
            changed = true;
          }
        }
      }
    }

    // check cols
    for (let c = 0; c < 9; c++) {
      let colComplete = true;
      for (let r = 0; r < 9; r++) {
        if (board[r]?.[c] === null || board[r]?.[c] !== solution[r]?.[c]) {
          colComplete = false;
          break;
        }
      }
      if (colComplete) {
        for (let r = 0; r < 9; r++) {
          const key = `${r},${c}`;
          if (!newlyFixed.has(key)) {
            newlyFixed.add(key);
            changed = true;
          }
        }
      }
    }

    // check 3x3 boxes
    for (let boxR = 0; boxR < 3; boxR++) {
      for (let boxC = 0; boxC < 3; boxC++) {
        let boxComplete = true;
        for (let r = boxR * 3; r < boxR * 3 + 3; r++) {
          for (let c = boxC * 3; c < boxC * 3 + 3; c++) {
            if (board[r]?.[c] === null || board[r]?.[c] !== solution[r]?.[c]) {
              boxComplete = false;
              break;
            }
          }
        }
        if (boxComplete) {
          for (let r = boxR * 3; r < boxR * 3 + 3; r++) {
            for (let c = boxC * 3; c < boxC * 3 + 3; c++) {
              const key = `${r},${c}`;
              if (!newlyFixed.has(key)) {
                newlyFixed.add(key);
                changed = true;
              }
            }
          }
        }
      }
    }

    if (changed) {
      setFixedCells(newlyFixed);
    }
  }, [board, solution, isLoading, isGameOver]);

  const resetFixedCells = () => setFixedCells(new Set());

  return { fixedCells, resetFixedCells };
};
