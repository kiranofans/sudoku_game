import { useState, useEffect, useRef } from 'react';

export type SudokuVariant = 'classic' | 'x-sudoku';

export type AnimationEvent = {
  type: 'row' | 'col' | 'box' | 'main-diagonal' | 'anti-diagonal';
  index: number;
  triggerCell: string | null;
  cells: string[];
};

type DomainDefinition = {
  key: string;
  type: AnimationEvent['type'];
  index: number;
  cells: string[];
};

/** The units that every standard 9×9 Sudoku must complete. */
const getRegularSudokuDomains = (): DomainDefinition[] => {
  const domains: DomainDefinition[] = [];

  for (let index = 0; index < 9; index++) {
    domains.push({
      key: `row:${index}`,
      type: 'row',
      index,
      cells: Array.from({ length: 9 }, (_, col) => `${index},${col}`)
    });
    domains.push({
      key: `col:${index}`,
      type: 'col',
      index,
      cells: Array.from({ length: 9 }, (_, row) => `${row},${index}`)
    });
  }

  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const index = boxRow * 3 + boxCol;
      const cells: string[] = [];

      for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
        for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
          cells.push(`${row},${col}`);
        }
      }

      domains.push({ key: `box:${index}`, type: 'box', index, cells });
    }
  }

  return domains;
};

/** Extra completion units supplied by a Sudoku variant. */
const getVariantSudokuDomains = (variant: SudokuVariant): DomainDefinition[] => {
  switch (variant) {
    case 'x-sudoku':
      return [
        {
          key: 'x-sudoku:main-diagonal',
          type: 'main-diagonal',
          index: 0,
          cells: Array.from({ length: 9 }, (_, i) => `${i},${i}`)
        },
        {
          key: 'x-sudoku:anti-diagonal',
          type: 'anti-diagonal',
          index: 1,
          cells: Array.from({ length: 9 }, (_, i) => `${i},${8 - i}`)
        }
      ];
    case 'classic':
      return [];
    default: {
      const unhandledVariant: never = variant;
      return unhandledVariant;
    }
  }
};

/**
 * Tracks completed standard Sudoku units and any additional units required by
 * the selected variant. A unit is complete only when all of its cells match
 * the generated solution.
 */
export const useCompletedDomains = (
  board: (number | null)[][],
  solution: number[][],
  isLoading: boolean,
  isGameOver: boolean,
  variant: SudokuVariant = 'classic'
) => {
  const [fixedCells, setFixedCells] = useState<Set<string>>(new Set());
  const [newAnimations, setNewAnimations] = useState<AnimationEvent[]>([]);
  const prevCompletedDomains = useRef(new Set<string>());
  const prevBoard = useRef<(number | null)[][]>([]);

  // Flatten the active animation events for consumers that need cell-level state.
  const animatingCellKeys = new Set(
    newAnimations.flatMap(animation => animation.cells)
  );

  useEffect(() => {
    if (board.length !== 9 || solution.length !== 9 || isLoading || isGameOver) return;

    let modifiedCell: string | null = null;
    if (prevBoard.current.length === 9) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] !== prevBoard.current[row][col] && board[row][col] !== null) {
            modifiedCell = `${row},${col}`;
          }
        }
      }
    }

    const newlyFixed = new Set<string>();
    const currentCompletedDomains = new Set<string>();
    const animationsToTrigger: AnimationEvent[] = [];
    const domains = [
      ...getRegularSudokuDomains(),
      ...getVariantSudokuDomains(variant)
    ];

    for (const domain of domains) {
      const isComplete = domain.cells.every(cellKey => {
        const [row, col] = cellKey.split(',').map(Number);
        return board[row][col] !== null && board[row][col] === solution[row][col];
      });

      if (!isComplete) continue;

      currentCompletedDomains.add(domain.key);
      domain.cells.forEach(cell => newlyFixed.add(cell));

      if (!prevCompletedDomains.current.has(domain.key)) {
        animationsToTrigger.push({
          type: domain.type,
          index: domain.index,
          triggerCell: modifiedCell,
          cells: domain.cells
        });
      }
    }

    prevCompletedDomains.current = currentCompletedDomains;
    prevBoard.current = board.map(row => [...row]);

    if (animationsToTrigger.length > 0) {
      setNewAnimations(animationsToTrigger);
    }

    if (newlyFixed.size !== fixedCells.size || [...newlyFixed].some(key => !fixedCells.has(key))) {
      setFixedCells(newlyFixed);
    }
  }, [board, solution, isLoading, isGameOver, fixedCells, variant]);

  const resetFixedCells = () => {
    setFixedCells(new Set());
    setNewAnimations([]);
    prevCompletedDomains.current = new Set();
    prevBoard.current = [];
  };

  const clearAnimations = () => setNewAnimations([]);

  return { fixedCells, newAnimations, animatingCellKeys, resetFixedCells, clearAnimations };
};
