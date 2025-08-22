import React from 'react'

interface ControlsProps {
  onNumberInput: (num: number) => void
  onPencilNote: (num: number) => void
  onEraser: () => void
  onHint: () => void
  onReset: () => void
  onNewGame: () => void
  isPlaying: boolean
}

const Controls: React.FC<ControlsProps> = ({
  onNumberInput,
  onPencilNote,
  onEraser,
  onHint,
  onReset,
  onNewGame,
  isPlaying
}) => {
  const [isPencilMode, setIsPencilMode] = React.useState(false)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key >= '1' && e.key <= '9') {
      const num = parseInt(e.key)
      if (isPencilMode) {
        onPencilNote(num)
      } else {
        onNumberInput(num)
      }
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      onEraser()
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown as any)
    return () => {
      window.removeEventListener('keydown', handleKeyDown as any)
    }
  }, [isPencilMode])

  return (
    <div className="controls" tabIndex={0}>
      <div className="number-pad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button 
            key={num} 
            onClick={() => isPencilMode ? onPencilNote(num) : onNumberInput(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="action-buttons">
        <button 
          className={isPencilMode ? 'active' : ''}
          onClick={() => setIsPencilMode(!isPencilMode)}
        >
          Pencil
        </button>
        <button onClick={onEraser}>Eraser</button>
        <button onClick={onHint} disabled={!isPlaying}>Hint</button>
        <button onClick={onReset} disabled={!isPlaying}>Reset</button>
        <button onClick={onNewGame}>New Game</button>
      </div>
    </div>
  )
}

export default Controls