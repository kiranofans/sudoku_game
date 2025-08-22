export type Difficulty = 'very-easy' | 'easy' | 'medium' | 'hard' | 'expert';

export function generateSudoku(difficulty: Difficulty = 'medium') {
  // Create a solved Sudoku board
  const solution = generateSolvedBoard();
  
  // Create a puzzle by removing numbers based on difficulty
  const puzzle = removeNumbers([...solution.map(row => [...row])], difficulty);
  
  return { puzzle, solution };
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
  const emptyCell = findEmptyCell(board);
  if (!emptyCell) return true; // No empty cells left
  
  const [row, col] = emptyCell;
  
  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;
      
      if (solveSudoku(board)) {
        return true;
      }
      
      board[row][col] = 0; // Backtrack
    }
  }
  
  return false;
}

function findEmptyCell(board: number[][]): [number, number] | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}

function isValid(board: number[][], row: number, col: number, num: number): boolean {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }
  
  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }
  
  // Check 3x3 box
  const boxStartRow = row - (row % 3);
  const boxStartCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxStartRow + i][boxStartCol + j] === num) return false;
    }
  }
  
  return true;
}

function removeNumbers(board: number[][], difficulty: Difficulty): (number | null)[][] {
  // Adjust difficulty levels for better gameplay
  const cellsToRemove = {
    'very-easy': 25,  // ~33% cells removed
    'easy': 38,       // ~44% cells removed
    'medium': 60,     // ~55% cells removed
    'hard': 70,       // ~61% cells removed
    'expert': 81      // ~66% cells removed
  }[difficulty];
  
  // Create a copy of the board to modify
  const puzzle: (number | null)[][] = board.map(row => [...row]);
  let removed = 0;
  const attempts = cellsToRemove * 2; // Limit attempts to prevent infinite loops
  
  for (let attempt = 0; attempt < attempts && removed < cellsToRemove; attempt++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    
    if (puzzle[row][col] !== null) {
      // Temporarily remove the number
      const backup = puzzle[row][col];
      puzzle[row][col] = null;
      
      // Check if the puzzle still has a unique solution
      if (hasUniqueSolution(puzzle.map(row => [...row]))) {
        removed++;
      } else {
        // Restore the number if removal breaks uniqueness
        puzzle[row][col] = backup;
      }
    }
  }
  
  return puzzle;
}

function hasUniqueSolution(puzzle: (number | null)[][]): boolean {
  // Convert to number[][] with 0 for empty cells
  const board = puzzle.map(row => 
    row.map(cell => cell === null ? 0 : cell)
  );
  
  // Count number of solutions
  return countSolutions([...board.map(row => [...row])]) === 1;
}

function countSolutions(board: number[][]): number {
  const emptyCell = findEmptyCell(board);
  if (!emptyCell) return 1; // Found a solution
  
  const [row, col] = emptyCell;
  let count = 0;
  
  for (let num = 1; num <= 9 && count < 2; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;
      count += countSolutions([...board.map(row => [...row])]);
      board[row][col] = 0; // Backtrack
    }
  }
  
  return count;
}

function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}