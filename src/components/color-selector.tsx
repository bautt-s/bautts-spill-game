import { FaPaw, FaAnchor, FaAppleAlt, FaBasketballBall } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'
import { IoMdFlower } from 'react-icons/io'

type SelectorType = {
    gameboard: {
        color: string,
        id: number
    }[][]

    gameState: {
        difficulty: string,
        darkMode: boolean,
        victory: boolean,
        icons: boolean,
        games: number  
        moves: number
    }

    setGameState: Function
    setGameboard: Function
}

const handleMove = (color: string, gameboard: { color: string, id: number }[][], setGameState: Function, 
gameState: { difficulty: string, moves: number, icons: boolean }, setGameboard: Function) => {
    const gameboardAux = gameboard
    const originBlocks = [gameboard[0][0].id]
    const currentColor = gameboard[0][0].color
    const newColorBlocks: number[] = []

    if (currentColor !== color) {
        setGameState({ ...gameState, moves: gameState.moves+1 })

        for (let i = 0; i < gameboard.length; i++) {
            for (let j = 0; j < gameboard.length; j++) {
                const neighbourBlocks = []

                if (i !== 0) neighbourBlocks.push(gameboard[i-1][j])
                if (j !== 0) neighbourBlocks.push(gameboard[i][j-1])
                if (i !== gameboard.length-1) neighbourBlocks.push(gameboard[i+1][j])
                if (j !== gameboard.length-1) neighbourBlocks.push(gameboard[i][j+1])

                for (let k = 0; k < neighbourBlocks.length; k++) {
                    if (originBlocks.includes(neighbourBlocks[k].id) && gameboard[i][j].color === currentColor) {
                        if (!originBlocks.includes(gameboard[i][j].id)) originBlocks.push(gameboard[i][j].id)    
                    }

                    if (gameboard[i][j].color === color && !originBlocks.includes(gameboard[i][j].id) && originBlocks.includes(neighbourBlocks[k].id)) {
                        if (!newColorBlocks.includes(gameboard[i][j].id)) newColorBlocks.push(gameboard[i][j].id)    
                    }
                }
            }
        }

        for (let i = 0; i < gameboard.length; i++) {
            gameboardAux[i].filter(block => originBlocks.includes(block.id)).forEach(b => b.color = color)
        }
    }

    
    newColorBlocks.push(...originBlocks)
    if (newColorBlocks.length === gameboard.length*gameboard.length) setGameState({ ...gameState, victory: true })
    setGameboard(gameboardAux)
}

const Selector: React.FC<SelectorType> = (props) => {
    const { gameState, setGameState, gameboard, setGameboard } = props

    return (
        <div className="flex flex-row gap-10 justify-center mt-[10px] pb-[20px]">
            <div className={`bg-[#C6262E] w-[50px] h-[50px] rounded-md cursor-pointer flex items-center justify-center`}
                onClick={() => handleMove('red', gameboard, setGameState, gameState, setGameboard)}>
                {gameState.icons && <FaAppleAlt className='text-white text-3xl' />}
            </div>

            <div className={`bg-[#F9C541] w-[50px] h-[50px] rounded-md cursor-pointer flex items-center justify-center`}
                onClick={() => handleMove('yellow', gameboard, setGameState, gameState, setGameboard)}>
                {gameState.icons && <AiFillStar className='text-white text-3xl' />}
            </div>

            <div className={`bg-[#68B622] w-[50px] h-[50px] rounded-md cursor-pointer flex items-center justify-center`}
                onClick={() => handleMove('green', gameboard, setGameState, gameState, setGameboard)}>
                {gameState.icons && <IoMdFlower className='text-white text-3xl' />}
            </div>

            <div className={`bg-[#3689E6] w-[50px] h-[50px] rounded-md cursor-pointer flex items-center justify-center`}
                onClick={() => handleMove('blue', gameboard, setGameState, gameState, setGameboard)}>
                {gameState.icons && <FaAnchor className='text-white text-3xl' />}
            </div>

            <div className={`bg-[#A56CE3] w-[50px] h-[50px] rounded-md cursor-pointer flex items-center justify-center`}
                onClick={() => handleMove('purple', gameboard, setGameState, gameState, setGameboard)}>
                {gameState.icons && <FaPaw className='text-white text-3xl' />}
            </div>

            <div className={`bg-[#C16601] w-[50px] h-[50px] rounded-md cursor-pointer flex items-center justify-center`}
                onClick={() => handleMove('brown', gameboard, setGameState, gameState, setGameboard)}>
                {gameState.icons && <FaBasketballBall className='text-white text-3xl' />}
            </div>

        </div>
    )
}

export default Selector