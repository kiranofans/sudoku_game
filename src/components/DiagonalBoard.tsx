import React from 'react'
import BoardSkeleton from './BoardSkeletonUI';

/**
 * DiagonalBoard (X-Sudoku Board)
 *
 * A Sudoku board variant where both main diagonals must also contain
 * digits 1–9 without repetition. Cells on the diagonals are visually
 * distinguished with a subtle tinted background.
 *
 * Reuses the same grid layout, cell styling, colors, and CSS classes
 * as the regular Board component for visual consistency.
 */

interface DiagonalBoardProps {
  isLoading: boolean;
  board: (number | null)[][];
  initialBoard: (number | null)[][];
  notes: Set<number>[][];
  selectedCell: [number, number] | null;
  onCellClick: (row: number, col: number) => void;
  solution: number[][];
  crossHighlight: { row: number | null; col: number | null };
  highlightedNumber: number | null;
  fixedCells: Set<string>;
}

/** Check if a cell lies on the main diagonal (top-left → bottom-right) */
const isMainDiagonal = (row: number, col: number): boolean => row === col;

/** Check if a cell lies on the anti-diagonal (top-right → bottom-left) */
const isAntiDiagonal = (row: number, col: number): boolean => row + col === 8;

/** Check if a cell lies on either diagonal */
const isDiagonalCell = (row: number, col: number): boolean =>
  isMainDiagonal(row, col) || isAntiDiagonal(row, col);

const DiagonalBoard: React.FC<DiagonalBoardProps> = ({
  isLoading,
  board,
  initialBoard,
  notes,
  selectedCell,
  onCellClick,
  solution,
  crossHighlight,
  highlightedNumber,
  fixedCells,
}) => {
  const getCellClass = (row: number, col: number): string => {
    let classes = "cell";

    // initial vs user-input
    if (initialBoard[row][col] !== null) {
      classes += " initial";
    }

    // selected cell
    if (selectedCell && selectedCell[0] === row && selectedCell[1] === col) {
      classes += " selected";
    }

    // thicker 3x3 block separators (avoid outer edges to prevent doubles)
    if (row % 3 === 2 && row !== 8) classes += " bottom-border";
    if (col % 3 === 2 && col !== 8) classes += " right-border";

    // outer borders
    if (row === 0) classes += " top-border";
    if (col === 0) classes += " left-border";

    // wrong input (user typed wrong number)
    const cell = board[row][col];
    if (
      cell !== null &&
      initialBoard[row][col] === null &&
      cell !== solution[row][col]
    ) {
      classes += " wrong";
    }

    // cross highlight — also highlight the diagonal if the selected cell is on one
    const isCrossRow = crossHighlight.row === row;
    const isCrossCol = crossHighlight.col === col;
    const isSameBox =
      crossHighlight.row !== null &&
      crossHighlight.col !== null &&
      Math.floor(row / 3) === Math.floor(crossHighlight.row / 3) &&
      Math.floor(col / 3) === Math.floor(crossHighlight.col / 3);

    // Diagonal cross-highlight: if the selected cell is on a diagonal,
    // highlight all other cells on that same diagonal
    const isDiagHighlight =
      selectedCell !== null &&
      isDiagonalCell(row, col) &&
      ((isMainDiagonal(selectedCell[0], selectedCell[1]) && isMainDiagonal(row, col)) ||
        (isAntiDiagonal(selectedCell[0], selectedCell[1]) && isAntiDiagonal(row, col)));

    if (isCrossRow || isCrossCol || isSameBox || isDiagHighlight) {
      classes += " cross-highlight";
    }

    // conflict highlight
    if (
      cell !== null &&
      selectedCell &&
      cell === board[selectedCell[0]][selectedCell[1]] &&
      cell !== solution[row][col]
    ) {
      classes += " highlighted-conflict";
    }

    // same-number highlight
    if (highlightedNumber !== null && cell === highlightedNumber) {
      classes += " number-highlight";
    }

    // Dynamic completion animation via Tailwind Custom Class
    if (fixedCells.has(`${row},${col}`)) {
      classes += " animate-complete-domain cell-fixed";
    }

    // Diagonal cell marker
    if (isDiagonalCell(row, col)) {
      classes += " diagonal-cell";
    }

    return classes;
  };

  // Early return if loading
  if (isLoading) {
    return <BoardSkeleton />;
  }

  return (
    <div className="sudoku-board diagonal-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => {
            const cellKey = `${rowIndex},${colIndex}`;
            const isFixed = fixedCells.has(cellKey);
            const isSelected =
              selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
            const onDiagonal = isDiagonalCell(rowIndex, colIndex);

            return (
              <div
                key={cellKey}
                className={`sudoku-cell 
    ${isFixed ? 'cell-fixed' : ''} 
    ${isSelected ? 'selected' : ''}
    ${getCellClass(rowIndex, colIndex)}`}
                onClick={() => onCellClick(rowIndex, colIndex)}
                style={fixedCells.has(cellKey) ? {
                  animationDelay: `${(rowIndex + colIndex) * 0.03}s`
                } : {}}
              >
                {cell !== null ? (
                  cell
                ) : (
                  <div className="notes-grid">
                    {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                      <div
                        key={num}
                        className={`note ${notes[rowIndex][colIndex]?.has(num) ? "visible" : ""
                          }`}
                      >
                        {notes[rowIndex][colIndex]?.has(num) ? num : ""}
                      </div>
                    ))}
                  </div>
                )}

                {/* Diagonal line decorators for cells on the diagonals */}
                {onDiagonal && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
                    {isMainDiagonal(rowIndex, colIndex) && (
                      <div className="absolute inset-0 origin-center rotate-45">
                        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-indigo-500 dark:bg-indigo-400" />
                      </div>
                    )}
                    {isAntiDiagonal(rowIndex, colIndex) && (
                      <div className="absolute inset-0 origin-center -rotate-45">
                        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-indigo-500 dark:bg-indigo-400" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export { DiagonalBoard };
export default DiagonalBoard;
