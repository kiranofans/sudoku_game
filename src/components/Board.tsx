import React from 'react'

interface BoardProps {
  board: (number | null)[][]
  initialBoard: (number | null)[][]
  notes: (number[] | null)[][]
  selectedCell: [number, number] | null
  onCellClick: (row: number, col: number) => void
}

const Board: React.FC<BoardProps> = ({ board, initialBoard, notes, selectedCell, onCellClick }) => {
  const getCellClass = (row: number, col: number) => {
    let classes = 'cell'
    if (initialBoard[row][col] !== null) {
      classes += ' initial'
    }
    if (selectedCell && selectedCell[0] === row && selectedCell[1] === col) {
      classes += ' selected'
    }
    // Add border classes for 3x3 blocks
    if (row % 3 === 2) classes += ' bottom-border'
    if (col % 3 === 2) classes += ' right-border'
    return classes
  }

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={getCellClass(rowIndex, colIndex)}
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
              {cell !== null ? (
                <div className={`number ${initialBoard[rowIndex][colIndex] === null ? 'user-input' : ''}`}>
                  {cell}
                </div>
              ) : notes[rowIndex][colIndex] ? (
                <div className="notes">
                  {Array.from({ length: 9 }, (_, i) => i + 1).map(num => (
                    <div 
                      key={num}
                      className={`note ${notes[rowIndex][colIndex]?.includes(num) ? 'active' : ''}`}
                    >
                      {notes[rowIndex][colIndex]?.includes(num) ? num : ''}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board