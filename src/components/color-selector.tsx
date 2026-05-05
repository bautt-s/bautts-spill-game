import React, { memo, useCallback } from 'react'
import { COLORS, ColorName } from '../constants'
import { GameState, Gameboard, Highscores } from '../types'
import { COLOR_ICONS } from '../color-icons'

type SelectorProps = {
    gameboard: Gameboard
    gameState: GameState
    highscores: Highscores
    setGameState: React.Dispatch<React.SetStateAction<GameState>>
    setGameboard: React.Dispatch<React.SetStateAction<Gameboard>>
    setHighscores: React.Dispatch<React.SetStateAction<Highscores>>
}

// BFS flood-fill from origin (0,0): much faster than the previous O(n²)
// neighbor scan and easier to reason about.
const floodFill = (board: Gameboard, newColor: ColorName): Gameboard => {
    const size = board.length
    const originColor = board[0][0].color
    if (originColor === newColor) return board

    const next: Gameboard = board.map(row => row.map(cell => ({ ...cell })))
    const queue: [number, number][] = [[0, 0]]
    const visited = new Set<number>([0])

    while (queue.length > 0) {
        const [r, c] = queue.shift()!
        next[r][c].color = newColor

        const neighbors: [number, number][] = [
            [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1],
        ]
        for (const [nr, nc] of neighbors) {
            if (nr < 0 || nc < 0 || nr >= size || nc >= size) continue
            const key = nr * size + nc
            if (visited.has(key)) continue
            if (board[nr][nc].color !== originColor) continue
            visited.add(key)
            queue.push([nr, nc])
        }
    }
    return next
}

const isUniformColor = (board: Gameboard, color: ColorName): boolean => {
    for (const row of board) {
        for (const cell of row) {
            if (cell.color !== color) return false
        }
    }
    return true
}

const Selector: React.FC<SelectorProps> = (props) => {
    const { gameState, setGameState, gameboard, setGameboard, highscores, setHighscores } = props
    const currentColor = gameboard[0][0].color
    const disabled = gameState.victory

    const handleMove = useCallback((color: ColorName) => {
        if (disabled) return
        if (currentColor === color) return

        const nextBoard = floodFill(gameboard, color)
        const nextMoves = gameState.moves + 1
        setGameboard(nextBoard)

        if (isUniformColor(nextBoard, color)) {
            setGameState(prev => ({ ...prev, moves: nextMoves, victory: true }))
            const prevBest = highscores[gameState.difficulty]
            if (prevBest === 0 || nextMoves < prevBest) {
                setHighscores(prev => ({ ...prev, [gameState.difficulty]: nextMoves }))
            }
        } else {
            setGameState(prev => ({ ...prev, moves: nextMoves }))
        }
    }, [disabled, currentColor, gameboard, gameState.moves, gameState.difficulty, highscores, setGameboard, setGameState, setHighscores])

    return (
        <div className="flex flex-row gap-x-7 justify-center pb-[15px]" role="group" aria-label="Color selector">
            {COLORS.map(({ name, hex }) => {
                const Icon = COLOR_ICONS[name]
                const isCurrent = currentColor === name
                return (
                    <button
                        key={name}
                        type="button"
                        aria-label={`Paint board ${name}`}
                        disabled={disabled || isCurrent}
                        onClick={() => handleMove(name)}
                        style={{ backgroundColor: hex }}
                        className={`w-[35px] h-[35px] rounded-md flex items-center justify-center transition-opacity
                            ${(disabled || isCurrent) ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'}`}
                    >
                        {gameState.icons && <Icon className='text-white text-2xl sm:text-3xl' aria-hidden="true" />}
                    </button>
                )
            })}
        </div>
    )
}

export default memo(Selector)
