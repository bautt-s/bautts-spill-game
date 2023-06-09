import { BsQuestionCircle, BsMoonFill, BsSunFill } from 'react-icons/bs'
import { LuRefreshCw } from 'react-icons/lu'
import Gameboard from './components/gameboard'
import NewGame from './components/new-game'
import Selector from './components/color-selector'
import { useState, useEffect } from 'react'

const generateRandomColor = () => {
    // this function takes a random number from 0 to 5, and gets a color based on that number
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * 6);

    switch (randomNumber) {
        case (0):
            return 'red'
        case (1):
            return 'yellow'
        case (2):
            return 'green'
        case (3):
            return 'blue'
        case (4):
            return 'purple'
        case (5):
            return 'brown'
        default:
            return ''
    }
}

const generateMatrix = (difficulty: string) => {
    // this function establishes a matrix size based on game difficulty, and then
    // generates the matrix based on that size, generating a random color in each position.
    let size;

    if (difficulty === 'easy') {
        size = 5;
    } else if (difficulty === 'medium') {
        size = 10;
    } else if (difficulty === 'hard') {
        size = 15;
    } else {
        throw new Error('Invalid difficulty level');
    }

    const matrix = []

    let id = 0;

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
    const [modalNewGame, setModalNewGame] = useState(false)
    const [gameState, setGameState] = useState({
        difficulty: 'medium',
        darkMode: false,
        victory: false,
        icons: false,
        games: 0,
        moves: 0
    })
    const [gameboard, setGameboard] = useState(generateMatrix(gameState.difficulty))

    useEffect(() => {
        setGameboard(generateMatrix(gameState.difficulty))
        setGameState({
            ...gameState,
            victory: false,
            moves: 0
        })
    }, [gameState.games])

    useEffect(() => {
        if (gameState.victory) setModalNewGame(true)
    }, [gameState.victory])

    return (
        <div className={`w-screen h-screen bg-[#555555] flex justify-center items-center ${gameState.darkMode && 'dark'}`}>
            <div className="w-[600px] bg-white dark:bg-[#323332] rounded-md shadow-2xl transition-colors duration-300">
                <h1 className="font-bold text-lg text-center py-[10px] rounded-md dark:text-white">Paint & Spill</h1>

                { /* scoreboard and buttons */}
                <div className="flex flex-row mt-[10px] mb-[20px] px-[15px] items-center dark:text-white">
                    <span>Moves used: <strong>{gameState.moves}</strong></span>

                    <label className='flex flex-row ml-[40px] items-center'>
                        <input type="checkbox" id="cbox-icons" onChange={() => setGameState({ ...gameState, icons: !gameState.icons })} />
                        <span className='ml-[7px]'>Show icons</span>
                    </label>


                    <div className="flex flex-row ml-auto">
                        <LuRefreshCw className='text-2xl cursor-pointer' onClick={() => setModalNewGame(true)} />
                        {gameState.darkMode 
                        ? <BsSunFill className='text-2xl ml-[15px] cursor-pointer' onClick={() => setGameState({ ...gameState, darkMode: false })} /> 
                        : <BsMoonFill className='text-2xl ml-[15px] cursor-pointer' onClick={() => setGameState({ ...gameState, darkMode: true })} />}
                        <BsQuestionCircle className='text-2xl ml-[15px] cursor-pointer' />
                    </div>
                </div>

                { /* gameboard */}
                <Gameboard gameState={gameState} gameboard={gameboard} />

                { /* selector */}
                <Selector gameState={gameState} setGameState={setGameState} gameboard={gameboard} setGameboard={setGameboard} />
            </div>

            {modalNewGame && <NewGame setModalNewGame={setModalNewGame} gameState={gameState} setGameState={setGameState} />}
        </div>
    )
}

export default App