import { BsQuestionCircle, BsMoonFill, BsSunFill, BsGithub } from 'react-icons/bs'
import { LuRefreshCw } from 'react-icons/lu'
import Gameboard from './components/gameboard'
import NewGame from './components/new-game'
import Selector from './components/color-selector'
import { useState, useEffect } from 'react'

// type for the global game state object
type GameStateType = {
    difficulty: 'easy' | 'medium' | 'hard',
    darkMode: boolean,
    victory: boolean,
    icons: boolean,
    games: number
    moves: number
}

// quite simple function that takes a random number from 0 to 5, 
// and gets a color based on that number. might add some complexity in
// random generation in a near future, according to difficulty
const generateRandomColor = () => {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * 6);

    if (randomNumber === 0) return 'red'
    else if (randomNumber === 1) return 'yellow'
    else if (randomNumber === 2) return 'green'
    else if (randomNumber === 3) return 'blue'
    else if (randomNumber === 4) return 'purple'
    else return 'pink'
}

// this function establishes a matrix size based on game difficulty, and then
// generates the matrix based on that size, generating a random color in each position.
const generateMatrix = (difficulty: string) => {
    const matrix = []
    let id = 0;
    let size;

    if (difficulty === 'easy') size = 5;
    else if (difficulty === 'medium') size = 10;
    else if (difficulty === 'hard') size = 15;
    else throw new Error('Invalid difficulty level');
    
    for (let i = 0; i < size; i++) {
        const row = [];

        for (let j = 0; j < size; j++) {
            row.push({
                id,
                color: generateRandomColor()
            });

            id++
        }
        matrix.push(row);
    }

    return matrix;
}

const App = () => {
    // here we control most of the game general state, in order to optimize code writing and reusability
    // (excluding highscores and gameboard, while we could in theory do that, it would lead to messy code)
    const [gameState, setGameState] = useState<GameStateType>({
        difficulty: 'medium',
        darkMode: false,
        victory: false,
        icons: false,
        games: 0,
        moves: 0
    })

    const [highscores, setHighscores] = useState({
        easy: 0,
        medium: 0,
        hard: 0,
    })

    const [modalNewGame, setModalNewGame] = useState(false)
    const [gameboard, setGameboard] = useState(generateMatrix(gameState.difficulty))

    // triggering when the user first boots the game or restarts it, we generate
    // another random board and clean all the game state back to default
    useEffect(() => {
        setGameboard(generateMatrix(gameState.difficulty))
        setGameState({
            ...gameState,
            victory: false,
            moves: 0
        })
    }, [gameState.games])

    // when the user wins, we want them to see the new game window
    useEffect(() => {
        if (gameState.victory) setModalNewGame(true)
    }, [gameState.victory])

    // these two useEffect make sure the game is correctly getting
    // and setting highscores from the browser's local storage.
    useEffect(() => {
        const highscoresData = window.localStorage.getItem('SPILLGAME_HIGHSCORES')
        if (highscoresData) setHighscores(JSON.parse(highscoresData))
    }, [])

    useEffect(() => {
        if (gameState.victory) window.localStorage.setItem('SPILLGAME_HIGHSCORES', JSON.stringify(highscores))
    }, [highscores])

    return (
        <div className={`overflow-y-hidden w-screen h-screen bg-[#555555] flex flex-col ${gameState.darkMode && 'dark'}`}>
            <div className='flex flex-col justify-center items-center h-full'>
                <div className="w-[400px] sm:w-[600px] bg-white dark:bg-[#323332] rounded-md shadow-2xl transition-colors duration-300">
                    <h1 className="font-bold text-lg text-center py-[10px] rounded-md dark:text-white">Paint & Spill</h1>

                    { /* scoreboard and buttons */}
                    <div className="grid grid-cols-3 mt-[10px] mb-[20px] px-[15px] items-center dark:text-white">
                        <span className='text-[0.92rem] sm:text-base'>Moves used: <strong>{gameState.moves}</strong></span>

                        <label className='flex flex-row ml-[20px] sm:ml-[45px] items-center'>
                            <input type="checkbox" id="cbox-icons" className='mt-[2px]' onChange={() => setGameState({ ...gameState, icons: !gameState.icons })} />
                            <span className='ml-[7px] text-[0.92rem] sm:text-base'>Show icons</span>
                        </label>


                        <div className="flex flex-row ml-auto items-center">
                            <LuRefreshCw className='text-2xl cursor-pointer' onClick={() => setModalNewGame(true)} />
                            {gameState.darkMode
                                ? <BsSunFill className='text-2xl ml-[10px] sm:ml-[15px] cursor-pointer' onClick={() => setGameState({ ...gameState, darkMode: false })} />
                                : <BsMoonFill className='text-2xl ml-[10px] sm:ml-[15px] cursor-pointer' onClick={() => setGameState({ ...gameState, darkMode: true })} />}
                            <BsQuestionCircle className='text-2xl ml-[8px] sm:ml-[13px] cursor-pointer' />
                        </div>
                    </div>

                    { /* gameboard */}
                    <Gameboard gameState={gameState} gameboard={gameboard} />

                    { /* selector */}
                    <Selector gameState={gameState} setGameState={setGameState} gameboard={gameboard}
                        setGameboard={setGameboard} highscores={highscores} setHighscores={setHighscores} />
                </div>
            </div>

            { /* credits */}
            <div className='w-full h-[60px] flex items-center justify-center'>
                <span className='font-semibold text-white mr-[20px] font-mono'>made ⚡ by bautt-s</span>

                <a href='https://github.com/bautt-s/bautts-spill-game' target='_blank'>
                    <BsGithub className='text-3xl text-white' />
                </a>
            </div>

            {modalNewGame && <NewGame setModalNewGame={setModalNewGame} gameState={gameState} setGameState={setGameState} highscores={highscores} />}
        </div>
    )
}

export default App