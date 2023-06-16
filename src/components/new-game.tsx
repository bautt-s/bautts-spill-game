import { useState } from 'react'

// typing used for component props
type NewGameType = {
    gameState: {
        difficulty: string,
        darkMode: boolean,
        victory: boolean,
        icons: boolean,
        games: number
        moves: number
    }

    highscores: {
        'easy': number,
        'medium': number,
        'hard': number
    }

    setGameState: Function
    setModalNewGame: Function
}

const NewGame: React.FC<NewGameType> = (props) => {
    const { gameState, highscores, setGameState, setModalNewGame } = props
    const [selected, setSelected] = useState(gameState.difficulty)

    const handleStart = () => {
        setGameState({ ...gameState, difficulty: selected, games: gameState.games + 1 })
        setModalNewGame(false)
    }

    return (
        <div className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center">
            <div className='bg-[#00000060] w-screen h-screen absolute z-1 backdrop-blur-sm' onClick={() => setModalNewGame(false)}></div>

            <div className="bg-white dark:bg-[#323332] flex flex-col justify-center w-[380px] sm:w-[400px] z-50 px-[20px] py-[30px] rounded-md dark:shadow-[#323332] dark:shadow-xl">
                {gameState.victory && <span className='text-center dark:text-white'>You achieved victory in <strong>{gameState.moves}</strong> moves!</span>}

                <div className='grid grid-cols-3 gap-[10px] mt-[15px]'>
                    <button
                        onClick={() => setSelected('easy')} className={`flex flex-col pl-[10px] py-[5px] rounded-md 
                    ${selected === 'easy' ? 'bg-[#01D1B3] dark:bg-[#18e2c4] text-white font-semibold' : 
                    'bg-[#DBDBDA] hover:bg-[#d1d1d1] transition-all duration-300 dark:bg-[#707270] dark:hover:bg-[#7d807d] dark:text-white font-semibold'}`}>
                        <span>Easy</span>
                        <span>[5x5]</span>
                    </button>

                    <button
                        onClick={() => setSelected('medium')} className={`flex flex-col pl-[10px] py-[5px] rounded-md 
                        ${selected === 'medium' ? 'bg-[#01D1B3] dark:bg-[#10f1d0] dark:text-[#323332] text-white font-semibold' : 
                        'bg-[#DBDBDA] hover:bg-[#d1d1d1] transition-all duration-300 dark:bg-[#707270] dark:hover:bg-[#7d807d] dark:text-white font-semibold'}`}>
                        <span>Medium</span>
                        <span>[10x10]</span>
                    </button>

                    <button
                        onClick={() => setSelected('hard')} className={`flex flex-col pl-[10px] py-[5px] rounded-md 
                    ${selected === 'hard' ? 'bg-[#01D1B3] dark:bg-[#18e2c4] text-white font-semibold' : 
                    'bg-[#DBDBDA] hover:bg-[#d1d1d1] transition-all duration-300 dark:bg-[#707270] dark:hover:bg-[#7d807d] dark:text-white font-semibold'}`}>
                        <span>Hard</span>
                        <span>[15x15]</span>
                    </button>
                </div>

                <div className='flex flex-col mt-[20px] px-[20px] dark:text-white'>
                    <h3 className='font-semibold'>Previous High Scores</h3>

                    {Object.entries(highscores).map(([difficulty, score]) => (
                        <div key={difficulty} className='flex flex-row'>
                            <span>{`${difficulty[0].toUpperCase() + difficulty.substring(1)}:`}</span>
                            <span className='flex ml-auto'>{score}</span>
                        </div>
                    ))}
                </div>

                <button onClick={handleStart}
                    className='w-full bg-[#01D1B3] hover:bg-[#3bbda9] transition-all duration-300 text-white py-[5px] rounded-md mt-[20px] 
                    font-semibold dark:bg-[#10f1d0] dark:hover:bg-[#10ddbe] dark:text-[#323332]'>
                    Start Game
                </button>
            </div>
        </div>
    )
}

export default NewGame