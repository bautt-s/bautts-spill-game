import { useState } from 'react'

type NewGameType = {
    gameState: {
        difficulty: string,
        darkMode: boolean,
        victory: boolean,
        icons: boolean, 
        games: number  
        moves: number
    }
    setGameState: Function
    setModalNewGame: Function
}

const NewGame: React.FC<NewGameType> = (props) => {
    const { gameState, setGameState, setModalNewGame } = props
    const [selected, setSelected] = useState(gameState.difficulty)

    const handleStart = () => {
        setGameState({ ...gameState, difficulty: selected, games: gameState.games+1 })
        setModalNewGame(false)
    }

    return (
        <div className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center">
            <div className='bg-[#00000060] w-screen h-screen absolute z-1 backdrop-blur-sm' onClick={() => setModalNewGame(false)}></div>

            <div className="bg-white flex flex-col justify-center w-[400px] z-50 px-[20px] py-[30px] rounded-md">
                {gameState.victory && <span className='text-center'>You achieved victory in <strong>{gameState.moves}</strong> moves!</span>}

                <div className='grid grid-cols-3 gap-[10px] mt-[15px]'>
                    <button 
                    onClick={() => setSelected('easy')} className={`flex flex-col pl-[10px] py-[5px] rounded-md 
                    ${selected === 'easy' ? 'bg-[#01D1B3] text-white font-semibold' : 'bg-[#DBDBDA] hover:bg-[#d1d1d1] transition-all duration-300'}`}>
                        <span>Easy</span>
                        <span>[5x5]</span>
                    </button>

                    <button 
                        onClick={() => setSelected('medium')} className={`flex flex-col pl-[10px] py-[5px] rounded-md 
                        ${selected === 'medium' ? 'bg-[#01D1B3] text-white font-semibold' : 'bg-[#DBDBDA] hover:bg-[#d1d1d1] transition-all duration-300'}`}>
                        <span>Medium</span>
                        <span>[10x10]</span>
                    </button>

                    <button 
                    onClick={() => setSelected('hard')} className={`flex flex-col pl-[10px] py-[5px] rounded-md 
                    ${selected === 'hard' ? 'bg-[#01D1B3] text-white font-semibold' : 'bg-[#DBDBDA] hover:bg-[#d1d1d1] transition-all duration-300'}`}>
                        <span>Hard</span>
                        <span>[15x15]</span>
                    </button>
                </div>

                <button onClick={handleStart}
                className='w-full bg-[#01D1B3] hover:bg-[#3bbda9] transition-all duration-300 text-white py-[5px] rounded-md mt-[20px] font-semibold'>
                    Start Game
                </button>
            </div>
        </div>
    )
}

export default NewGame