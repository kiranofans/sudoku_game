import React from 'react'

interface GameInfoProps {
  time: number
  mistakes: number
  hints: number
  completedNumbers: Record<number, boolean>
  difficulty: string
  setDifficulty: (difficulty: string) => void
}

const GameInfo: React.FC<GameInfoProps> = ({ 
  time, 
  mistakes, 
  hints, 
  completedNumbers,
  difficulty,
  setDifficulty 
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="game-info">
      <div className="difficulty-selector">
        <label>Difficulty: </label>
        <select 
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="very-easy">Very Easy</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="expert">Expert</option>
        </select>
      </div>
      <div className="stats">
        <div>Time: {formatTime(time)}</div>
        <div>Mistakes: {mistakes}/3</div>
        <div>Hints left: {hints}</div>
      </div>
      <div className="completed-numbers">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <div 
            key={num} 
            className={`number ${completedNumbers[num] ? 'completed' : ''}`}
          >
            {completedNumbers[num] ? '' : num}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameInfo