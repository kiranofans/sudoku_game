export type Difficulty = 'very-easy' | 'easy' | 'medium' | 'hard' | 'expert';

export function generateSudoku(difficulty: Difficulty = 'medium') {
  // Calibrated removal counts for clear separation
  const targetToRemove = {
    'very-easy': 30,  // ~51 clues
    'easy': 42,       // ~39 clues
    'medium': 48,     // ~33 clues
    'hard': 54,       // ~27 clues
    'expert': 64      // ~17 clues
  }[difficulty];

  const boardAttempts = difficulty === 'expert' ? 15 : (difficulty === 'hard' ? 5 : 1);
  const pathsPerBoard = difficulty === 'expert' ? 30 : (difficulty === 'hard' ? 10 : 1);

  let bestPuzzle: (number | null)[][] = [];
  let bestRemovedCount = -1;
  let finalSolution: number[][] = [];

  // Try multiple solved boards
  for (let boardRetry = 0; boardRetry < boardAttempts; boardRetry++) {
    const solution = generateSolvedBoard();
    const flatSolution = solution.flat();

    for (let pathRetry = 0; pathRetry < pathsPerBoard; pathRetry++) {
      const puzzle = removeNumbersOptimized(flatSolution, targetToRemove);
      const currentRemoved = puzzle.filter(x => x === null).length;

      if (currentRemoved > bestRemovedCount) {
        bestRemovedCount = currentRemoved;
        const grid: (number | null)[][] = [];
        for (let i = 0; i < 9; i++) {
          grid.push(puzzle.slice(i * 9, i * 9 + 9));
        }
        bestPuzzle = grid;
        finalSolution = solution;
      }

      if (bestRemovedCount >= targetToRemove) break;
    }
    if (bestRemovedCount >= targetToRemove) break;
  }

  return { puzzle: bestPuzzle, solution: finalSolution };
}

function generateSolvedBoard(): number[][] {
  // Create empty board
  const board: number[][] = Array(9).fill(null).map(() => Array(9).fill(0));

  // Fill diagonal 3x3 boxes
  fillDiagonalBoxes(board);

  // Solve the rest of the board
  if (!solveSudoku(board)) {
    throw new Error('Failed to generate solved Sudoku board');
  }

  return board;
}

function fillDiagonalBoxes(board: number[][]) {
  for (let box = 0; box < 9; box += 3) {
    fillBox(board, box, box);
  }
}

function fillBox(board: number[][], row: number, col: number) {
  const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let index = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[row + i][col + j] = nums[index++];
    }
  }
}

function solveSudoku(board: number[][]): boolean {
  // Convert 2D board to flat Int8Array for optimized checking
  const flat = new Int8Array(81);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      flat[r * 9 + c] = board[r][c];
    }
  }

  // Find first empty cell (solved board gen can use simple index or MRV)
  let bestPos = -1;
  for (let i = 0; i < 81; i++) {
    if (flat[i] === 0) {
      bestPos = i;
      break;
    }
  }

  if (bestPos === -1) return true;

  const candidates = shuffle(getCandidates(flat, bestPos));
  for (const num of candidates) {
    board[Math.floor(bestPos / 9)][bestPos % 9] = num;
    if (solveSudoku(board)) return true;
    board[Math.floor(bestPos / 9)][bestPos % 9] = 0;
  }
  return false;
}

// findEmptyCell and isValid replaced by optimized counterparts

function removeNumbersOptimized(flatSolution: number[], targetToRemove: number): (number | null)[] {
  const puzzle: (number | null)[] = [...flatSolution];
  const positions = shuffle(Array.from({ length: 81 }, (_, i) => i));

  let removedCount = 0;
  for (const pos of positions) {
    if (removedCount >= targetToRemove) break;
    if (puzzle[pos] === null) continue;

    const symPos = 80 - pos;
    const backupPos = puzzle[pos];
    const backupSym = puzzle[symPos];

    // Attempt to remove symmetric pair
    puzzle[pos] = null;
    puzzle[symPos] = null;

    if (hasUniqueSolutionOptimized(puzzle)) {
      removedCount += (pos === symPos ? 1 : 2);
    } else {
      puzzle[pos] = backupPos;
      puzzle[symPos] = backupSym;
    }
  }
  return puzzle;
}

function hasUniqueSolutionOptimized(puzzle: (number | null)[]): boolean {
  const board = new Int8Array(81);
  for (let i = 0; i < 81; i++) {
    board[i] = puzzle[i] === null ? 0 : (puzzle[i] as number);
  }
  return countSolutionsOptimized(board) === 1;
}

function countSolutionsOptimized(board: Int8Array): number {
  let minCandidates = 10;
  let bestPos = -1;
  let bestCandidates: number[] = [];

  // Find cell with minimum remaining values (MRV)
  for (let i = 0; i < 81; i++) {
    if (board[i] === 0) {
      const candidates = getCandidates(board, i);
      if (candidates.length === 0) return 0; // Unsolvable
      if (candidates.length < minCandidates) {
        minCandidates = candidates.length;
        bestPos = i;
        bestCandidates = candidates;
        if (minCandidates === 1) break; // Optimization: Found a naked single
      }
    }
  }

  if (bestPos === -1) return 1; // Solution found

  let count = 0;
  for (const num of bestCandidates) {
    board[bestPos] = num;
    count += countSolutionsOptimized(board);
    board[bestPos] = 0;
    if (count > 1) return count; // Optimization: stop if multiple solutions found
  }
  return count;
}

function getCandidates(board: Int8Array, pos: number): number[] {
  const row = Math.floor(pos / 9);
  const col = pos % 9;
  const candidates = [];

  const used = new Uint8Array(10);

  // Row and Column
  for (let i = 0; i < 9; i++) {
    used[board[row * 9 + i]] = 1;
    used[board[i * 9 + col]] = 1;
  }

  // 3x3 Box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      used[board[(boxRow + i) * 9 + (boxCol + j)]] = 1;
    }
  }

  for (let num = 1; num <= 9; num++) {
    if (used[num] === 0) candidates.push(num);
  }
  return candidates;
}


function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}