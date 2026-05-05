import React, { useState, useEffect, useRef } from 'react'
import { BOARD_SIZES, Difficulty } from '../constants'
import { GameState, Highscores } from '../types'

type NewGameProps = {
    gameState: GameState
    highscores: Highscores
    setGameState: React.Dispatch<React.SetStateAction<GameState>>
    setModalNewGame: React.Dispatch<React.SetStateAction<boolean>>
}

const DIFFICULTIES: { id: Difficulty; label: string }[] = [
    { id: 'easy', label: 'Easy' },
    { id: 'medium', label: 'Medium' },
    { id: 'hard', label: 'Hard' },
]

const NewGame: React.FC<NewGameProps> = ({ gameState, highscores, setGameState, setModalNewGame }) => {
    const [selected, setSelected] = useState<Difficulty>(gameState.difficulty)
    const startBtnRef = useRef<HTMLButtonElement>(null)

    const handleStart = () => {
        setGameState(prev => ({ ...prev, difficulty: selected, games: prev.games + 1 }))
        setModalNewGame(false)
    }

    const close = () => setModalNewGame(false)

    useEffect(() => {
        startBtnRef.current?.focus()
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="newgame-title"
        >
            <div className='bg-[#00000060] w-screen h-screen absolute z-1 backdrop-blur-sm' onClick={close}></div>

            <div className="bg-white dark:bg-[#323332] flex flex-col justify-center w-[380px] sm:w-[400px] z-50 px-[20px] py-[30px] rounded-md dark:shadow-[#323332] dark:shadow-xl">
                <h2 id="newgame-title" className="sr-only">New game</h2>
                {gameState.victory && (
                    <span className='text-center dark:text-white'>
                        You achieved victory in <strong>{gameState.moves}</strong> moves!
                    </span>
                )}

                <div className='grid grid-cols-3 gap-[10px] mt-[15px]' role="radiogroup" aria-label="Difficulty">
                    {DIFFICULTIES.map(({ id, label }) => {
                        const size = BOARD_SIZES[id]
                        const isSelected = selected === id
                        return (
                            <button
                                key={id}
                                type="button"
                                role="radio"
                                aria-checked={isSelected}
                                onClick={() => setSelected(id)}
                                className={`flex flex-col pl-[10px] py-[5px] rounded-md
                                    ${isSelected
                                        ? 'bg-[#01D1B3] dark:bg-[#18e2c4] dark:text-[#323332] text-white font-semibold'
                                        : 'bg-[#DBDBDA] hover:bg-[#d1d1d1] transition-all duration-300 dark:bg-[#707270] dark:hover:bg-[#7d807d] dark:text-white font-semibold'}`}
                            >
                                <span>{label}</span>
                                <span>[{size}x{size}]</span>
                            </button>
                        )
                    })}
                </div>

                <div className='flex flex-col mt-[20px] px-[20px] dark:text-white'>
                    <h3 className='font-semibold'>Previous High Scores</h3>

                    {DIFFICULTIES.map(({ id, label }) => {
                        const score = highscores[id]
                        return (
                            <div key={id} className='flex flex-row'>
                                <span>{label}:</span>
                                <span className='flex ml-auto'>{score === 0 ? '-' : score}</span>
                            </div>
                        )
                    })}
                </div>

                <button
                    ref={startBtnRef}
                    type="button"
                    onClick={handleStart}
                    className='w-full bg-[#01D1B3] hover:bg-[#3bbda9] transition-all duration-300 text-white py-[5px] rounded-md mt-[20px]
                    font-semibold dark:bg-[#10f1d0] dark:hover:bg-[#10ddbe] dark:text-[#323332]'
                >
                    Start Game
                </button>
            </div>
        </div>
    )
}

export default NewGame
