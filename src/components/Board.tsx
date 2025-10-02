import React from 'react'

interface BoardProps {
  board: (number | null)[][];
  initialBoard: (number | null)[][];
  notes: Set<number>[][];
  selectedCell: [number, number] | null;
  onCellClick: (row: number, col: number) => void;
  solution: number[][];
  crossHighlight: { row: number | null; col: number | null };
  highlightedNumber: number | null;
}

const Board: React.FC<BoardProps> = ({ board, initialBoard, notes, selectedCell, onCellClick,
  solution,
  crossHighlight,
  highlightedNumber
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

    // cross highlight
    const isCrossRow = crossHighlight.row === row;
    const isCrossCol = crossHighlight.col === col;
    const isSameBox =
      crossHighlight.row !== null &&
      crossHighlight.col !== null &&
      Math.floor(row / 3) === Math.floor(crossHighlight.row / 3) &&
      Math.floor(col / 3) === Math.floor(crossHighlight.col / 3);

    if (isCrossRow || isCrossCol || isSameBox) {
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

    return classes;
  };

  return (
    <div className="sudoku-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => {

            return (
              <div
                key={colIndex}
                className={
                  getCellClass(rowIndex, colIndex)
                }
                onClick={() => onCellClick(rowIndex, colIndex)}
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
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board