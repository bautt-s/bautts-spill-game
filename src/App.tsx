import { BsQuestionCircle, BsMoonFill, BsSunFill, BsGithub } from 'react-icons/bs'
import { LuRefreshCw } from 'react-icons/lu'
import Gameboard from './components/gameboard'
import NewGame from './components/new-game'
import Selector from './components/color-selector'
import HelpModal from './components/help'
import ErrorBoundary from './components/error-boundary'
import { useState, useEffect, useCallback } from 'react'
import { COLORS, BOARD_SIZES, HIGHSCORES_STORAGE_KEY, ColorName, Difficulty } from './constants'
import { GameState, Gameboard as GameboardType, Highscores } from './types'

const generateRandomColor = (): ColorName => {
    return COLORS[Math.floor(Math.random() * COLORS.length)].name
}

const generateMatrix = (difficulty: Difficulty): GameboardType => {
    const size = BOARD_SIZES[difficulty]
    const matrix: GameboardType = []
    let id = 0

    for (let i = 0; i < size; i++) {
        const row = []
        for (let j = 0; j < size; j++) {
            row.push({ id, color: generateRandomColor() })
            id++
        }
        matrix.push(row)
    }
    return matrix
}

const loadHighscores = (): Highscores => {
    try {
        const raw = window.localStorage.getItem(HIGHSCORES_STORAGE_KEY)
        if (!raw) return { easy: 0, medium: 0, hard: 0 }
        const parsed = JSON.parse(raw)
        return {
            easy: typeof parsed?.easy === 'number' ? parsed.easy : 0,
            medium: typeof parsed?.medium === 'number' ? parsed.medium : 0,
            hard: typeof parsed?.hard === 'number' ? parsed.hard : 0,
        }
    } catch {
        return { easy: 0, medium: 0, hard: 0 }
    }
}

const App = () => {
    const [gameState, setGameState] = useState<GameState>({
        difficulty: 'medium',
        darkMode: false,
        victory: false,
        icons: false,
        games: 0,
        moves: 0,
    })

    const [highscores, setHighscores] = useState<Highscores>(loadHighscores)
    const [modalHelp, setModalHelp] = useState(false)
    const [modalNewGame, setModalNewGame] = useState(false)
    const [gameboard, setGameboard] = useState<GameboardType>(() => generateMatrix(gameState.difficulty))

    useEffect(() => {
        document.body.style.overflowY = (modalHelp || modalNewGame) ? 'hidden' : 'scroll'
    }, [modalHelp, modalNewGame])

    // When user starts a new game (games counter bumps), regenerate the board
    // and reset per-game state. Functional setter avoids stale closures.
    useEffect(() => {
        if (gameState.games === 0) return
        setGameboard(generateMatrix(gameState.difficulty))
        setGameState(prev => ({ ...prev, victory: false, moves: 0 }))
    }, [gameState.games, gameState.difficulty])

    useEffect(() => {
        if (gameState.victory) setModalNewGame(true)
    }, [gameState.victory])

    useEffect(() => {
        try {
            window.localStorage.setItem(HIGHSCORES_STORAGE_KEY, JSON.stringify(highscores))
        } catch {
            // Storage may be unavailable (private mode, quota exceeded). Ignore.
        }
    }, [highscores])

    const restart = useCallback(() => setModalNewGame(true), [])
    const toggleDark = useCallback(() => setGameState(p => ({ ...p, darkMode: !p.darkMode })), [])
    const toggleIcons = useCallback(() => setGameState(p => ({ ...p, icons: !p.icons })), [])
    const openHelp = useCallback(() => setModalHelp(true), [])

    return (
        <ErrorBoundary>
            <div className={`pt-4 min-w-screen min-h-screen bg-[#555555] flex flex-col ${gameState.darkMode && 'dark'}`}>
                <div className='flex flex-col items-center'>
                    <div className="bg-white dark:bg-[#323332] rounded-md shadow-2xl transition-colors duration-300">
                        <h1 className="font-bold text-lg text-center py-[10px] rounded-md dark:text-white">Paint & Spill</h1>

                        <div className="grid grid-cols-3 mt-[5px] mb-[20px] px-[15px] items-center dark:text-white">
                            <span className='text-sm'>Moves used: <strong>{gameState.moves}</strong></span>

                            <label htmlFor="cbox-icons" className='flex flex-row mx-auto items-center cursor-pointer'>
                                <input
                                    type="checkbox"
                                    id="cbox-icons"
                                    className='mt-[2px]'
                                    checked={gameState.icons}
                                    onChange={toggleIcons}
                                />
                                <span className='ml-[7px] text-sm'>Show icons</span>
                            </label>

                            <div className="flex flex-row ml-auto items-center">
                                <button type="button" aria-label="Restart game" onClick={restart} className="cursor-pointer">
                                    <LuRefreshCw className='text-xl' aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    aria-label={gameState.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                                    onClick={toggleDark}
                                    className="ml-[10px] sm:ml-[15px] cursor-pointer"
                                >
                                    {gameState.darkMode
                                        ? <BsSunFill className='text-xl' aria-hidden="true" />
                                        : <BsMoonFill className='text-xl' aria-hidden="true" />}
                                </button>
                                <button type="button" aria-label="How to play" onClick={openHelp} className="ml-[8px] sm:ml-[13px] cursor-pointer">
                                    <BsQuestionCircle className='text-xl' aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <Gameboard gameState={gameState} gameboard={gameboard} />

                        <Selector
                            gameState={gameState}
                            setGameState={setGameState}
                            gameboard={gameboard}
                            setGameboard={setGameboard}
                            highscores={highscores}
                            setHighscores={setHighscores}
                        />
                    </div>
                </div>

                <div className='w-full h-[60px] flex items-center justify-center'>
                    <span className='font-semibold text-white mr-[20px] font-mono'>made ⚡ by bautt-s</span>

                    <a
                        href='https://github.com/bautt-s/bautts-spill-game'
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='View source on GitHub'
                    >
                        <BsGithub className='text-3xl text-white' aria-hidden="true" />
                    </a>
                </div>

                {modalNewGame && (
                    <NewGame
                        setModalNewGame={setModalNewGame}
                        gameState={gameState}
                        setGameState={setGameState}
                        highscores={highscores}
                    />
                )}
                {modalHelp && <HelpModal darkMode={gameState.darkMode} setModalHelp={setModalHelp} />}
            </div>
        </ErrorBoundary>
    )
}

export default App
