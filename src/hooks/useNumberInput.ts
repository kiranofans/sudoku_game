import { useCallback } from 'react';

type CellNotes = Set<number>;

interface UseNumberInputProps {
  selectedCell: [number, number] | null;
  isGameOver: boolean;
  initialBoard: (number | null)[][];
  isPencilMode: boolean;
  notes: CellNotes[][];
  setNotes: (notes: CellNotes[][]) => void;
  board: (number | null)[][];
  setBoard: (board: (number | null)[][]) => void;
  solution: number[][];
  updateCountsAfterInput: (num: number, increment: boolean) => void;
  addCorrectMoveScore: () => void;
  checkBoardComplete: (board: (number | null)[][]) => boolean;
  calculateFinalWin: (timeLeft: number) => void;
  setIsGameOver: (isGameOver: boolean) => void;
  timeLeft: number;
  deductMistakeScore: () => void;
  setMistakes: (updater: (prev: number) => number) => void;
  setCrossHighlight: (coords: { row: number | null; col: number | null }) => void;
  numberCounts: { [key: number]: number };
}

export const useNumberInput = ({
  selectedCell,
  isGameOver,
  initialBoard,
  isPencilMode,
  notes,
  setNotes,
  board,
  setBoard,
  solution,
  updateCountsAfterInput,
  addCorrectMoveScore,
  checkBoardComplete,
  calculateFinalWin,
  setIsGameOver,
  timeLeft,
  deductMistakeScore,
  setMistakes,
  setCrossHighlight,
  numberCounts
}: UseNumberInputProps) => {
  const handleNumberInput = useCallback((num: number) => {
    if (!selectedCell || isGameOver) return;
    if (numberCounts[num] <= 0) return;
    
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
      if (num !== null) {
        const currentNum = board[row][col];
        // Increment count only if the existing number is correct
        if (currentNum !== null && currentNum === solution[row][col]) {
          updateCountsAfterInput(currentNum, true);
        }

        if (solution[row][col] === num) {
          const newBoard = board.map(row => [...row]);
          newBoard[row][col] = num;
          setBoard(newBoard);

          const newNotes = [...notes];
          newNotes[row][col] = new Set();
          setNotes(newNotes);

          updateCountsAfterInput(num, false);

          // Add incremental points for correct move
          addCorrectMoveScore();

          if (checkBoardComplete(newBoard)) {
            // Final score calculation with time used
            calculateFinalWin(timeLeft);
            setIsGameOver(true);
          }
        } else {
          const newBoard = board.map(row => [...row]);
          newBoard[row][col] = num;
          setBoard(newBoard);

          // Subtract penalty for mistake
          deductMistakeScore();

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
  }, [
    selectedCell, isGameOver, isPencilMode, notes, solution, board, initialBoard,
    updateCountsAfterInput, addCorrectMoveScore, deductMistakeScore,
    calculateFinalWin, timeLeft, setNotes, setBoard, checkBoardComplete,
    setIsGameOver, setMistakes, setCrossHighlight, numberCounts
  ]);

  return { handleNumberInput };
};
