import { useState, useEffect, useRef } from 'react';

export type AnimationEvent = {
  type: 'row' | 'col' | 'box';
  index: number;
  triggerCell: string | null;
  cells: string[];
};

/**
 * 
 * @param board - The current Sudoku board
 * @param solution - The solution to the Sudoku board
 * @param isLoading - Whether the game is loading
 * @param isGameOver - Whether the game is over
 * @returns 
 */
export const useCompletedDomains = (
  board: (number | null)[][],
  solution: number[][],
  isLoading: boolean,
  isGameOver: boolean
) => {
  const [fixedCells, setFixedCells] = useState<Set<string>>(new Set());
  const [newAnimations, setNewAnimations] = useState<AnimationEvent[]>([]);

  const prevCompletedDomains = useRef({
    rows: new Set<number>(),
    cols: new Set<number>(),
    boxes: new Set<number>()
  });
  const prevBoard = useRef<(number | null)[][]>([]);

  // 1. Create a flattened set of all cells that should be animating right now
  const animatingCellKeys = new Set(
    newAnimations.flatMap(animation => animation.cells)
  );

  useEffect(() => {
    if (board.length !== 9 || solution.length !== 9 || isLoading || isGameOver) return;

    let modifiedCell: string | null = null;
    if (prevBoard.current.length === 9) {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (board[r][c] !== prevBoard.current[r][c] && board[r][c] !== null) {
            modifiedCell = `${r},${c}`;
          }
        }
      }
    }

    const newlyFixed = new Set<string>();
    const currentCompleted = {
      rows: new Set<number>(),
      cols: new Set<number>(),
      boxes: new Set<number>()
    };
    const animationsToTrigger: AnimationEvent[] = [];

    // Check Rows
    for (let r = 0; r < 9; r++) {
      let rowComplete = true;
      const cellsInRow: string[] = [];
      for (let c = 0; c < 9; c++) {
        cellsInRow.push(`${r},${c}`);
        if (board[r][c] === null || board[r][c] !== solution[r][c]) {
          rowComplete = false;
        }
      }
      if (rowComplete) {
        currentCompleted.rows.add(r);
        cellsInRow.forEach(cell => newlyFixed.add(cell));
        if (!prevCompletedDomains.current.rows.has(r)) {
          animationsToTrigger.push({ type: 'row', index: r, triggerCell: modifiedCell, cells: cellsInRow });
        }
      }
    }

    // Check Cols
    for (let c = 0; c < 9; c++) {
      let colComplete = true;
      const cellsInCol: string[] = [];
      for (let r = 0; r < 9; r++) {
        cellsInCol.push(`${r},${c}`);
        if (board[r][c] === null || board[r][c] !== solution[r][c]) {
          colComplete = false;
        }
      }
      if (colComplete) {
        currentCompleted.cols.add(c);
        cellsInCol.forEach(cell => newlyFixed.add(cell));
        if (!prevCompletedDomains.current.cols.has(c)) {
          animationsToTrigger.push({ type: 'col', index: c, triggerCell: modifiedCell, cells: cellsInCol });
        }
      }
    }

    // Check Boxes
    for (let boxR = 0; boxR < 3; boxR++) {
      for (let boxC = 0; boxC < 3; boxC++) {
        let boxComplete = true;
        const cellsInBox: string[] = [];
        const boxIndex = boxR * 3 + boxC;

        for (let r = boxR * 3; r < boxR * 3 + 3; r++) {
          for (let c = boxC * 3; c < boxC * 3 + 3; c++) {
            cellsInBox.push(`${r},${c}`);
            if (board[r][c] === null || board[r][c] !== solution[r][c]) {
              boxComplete = false;
            }
          }
        }
        if (boxComplete) {
          currentCompleted.boxes.add(boxIndex);
          cellsInBox.forEach(cell => newlyFixed.add(cell));
          if (!prevCompletedDomains.current.boxes.has(boxIndex)) {
            animationsToTrigger.push({ type: 'box', index: boxIndex, triggerCell: modifiedCell, cells: cellsInBox });
          }
        }
      }
    }

    prevCompletedDomains.current = currentCompleted;
    prevBoard.current = board.map(row => [...row]);

    if (animationsToTrigger.length > 0) {
      setNewAnimations(animationsToTrigger);
    }

    if (newlyFixed.size !== fixedCells.size || [...newlyFixed].some(key => !fixedCells.has(key))) {
      setFixedCells(newlyFixed);
    }
  }, [board, solution, isLoading, isGameOver, fixedCells]);

  const resetFixedCells = () => {
    setFixedCells(new Set());
    setNewAnimations([]);
    prevCompletedDomains.current = { rows: new Set(), cols: new Set(), boxes: new Set() };
    prevBoard.current = [];
  };

  const clearAnimations = () => setNewAnimations([]);

  return { fixedCells, newAnimations, animatingCellKeys, resetFixedCells, clearAnimations };
};