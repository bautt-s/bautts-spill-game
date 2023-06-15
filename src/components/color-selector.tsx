import { FaPaw, FaAnchor, FaAppleAlt, FaBasketballBall } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'
import { IoMdFlower } from 'react-icons/io'

// type used for component props and handleMove function arguments
type SelectorType = {
    gameboard: {
        color: string,
        id: number
    }[][]

    gameState: {
        difficulty: 'easy' | 'medium' | 'hard',
        darkMode: boolean,
        victory: boolean,
        icons: boolean,
        games: number
        moves: number
    }

    highscores: {
        easy: number,
        medium: number,
        hard: number
    }

    setGameState: Function
    setGameboard: Function
    setHighscores: Function
}

// this function is where the magic happens: we handle the whole 
// state of the game from here, along with the win condition.
const handleMove = (
    color: string,
    gameboard: SelectorType['gameboard'],
    setGameState: SelectorType['setGameState'],
    gameState: SelectorType['gameState'],
    setGameboard: SelectorType['setGameboard'],
    highscores: SelectorType['highscores'],
    setHighscores: SelectorType['setHighscores']
) => {
    // little help with these variables:

    // gameboardAux will be a copy of the current gameboard, which is the one we will be working on.
    // originBlocks is array which contains all of the blocks' IDs that are connected to the origin (block 0) by color.
    // currentColor does not really need an explanation: is the color which block 0 currently holds.
    // newColorBlocks contains the IDs of the blocks which will be added to the originBlocks array in the next move (if there would be one)
    const gameboardAux = gameboard
    const originBlocks = [gameboard[0][0].id]
    const currentColor = gameboard[0][0].color
    const newColorBlocks: number[] = []

    if (currentColor !== color) {
        setGameState({ ...gameState, moves: gameState.moves + 1 })

        for (let i = 0; i < gameboard.length; i++) {
            for (let j = 0; j < gameboard.length; j++) {
                // this array is self explaining. here we store the 4 neighbours blocks of the 
                // targeted block, in order to see if any of them is connected to origin.
                const neighbourBlocks = []

                if (i !== 0) neighbourBlocks.push(gameboard[i - 1][j])
                if (j !== 0) neighbourBlocks.push(gameboard[i][j - 1])
                if (i !== gameboard.length - 1) neighbourBlocks.push(gameboard[i + 1][j])
                if (j !== gameboard.length - 1) neighbourBlocks.push(gameboard[i][j + 1])

                // iterating through the neighbours, we check if any of them are connected to origin, and if the
                // targeted block is of the same color as the current one. if all of this checks out, then we add 
                // the targeted block's ID to the origin blocks array.
                for (let k = 0; k < neighbourBlocks.length; k++) {
                    if (originBlocks.includes(neighbourBlocks[k].id) && gameboard[i][j].color === currentColor) {
                        if (!originBlocks.includes(gameboard[i][j].id)) originBlocks.push(gameboard[i][j].id)    
                    }

                    // conditions are written so the last block/s being painted trigger the victory
                    if (gameboard[i][j].color === color && !originBlocks.includes(gameboard[i][j].id) && originBlocks.includes(neighbourBlocks[k].id)) {
                        if (!newColorBlocks.includes(gameboard[i][j].id)) newColorBlocks.push(gameboard[i][j].id)    
                    }
                }
            }
        }

        // passing through each row, we now check every new addition to origin and paint it
        for (let i = 0; i < gameboard.length; i++) {
            gameboardAux[i].filter(block => originBlocks.includes(block.id)).forEach(b => b.color = color)
        }
    }

    // win condition checker. if (origin blocks number + new blocks added === total blocks),
    // then the player has painted all the gameboard the same color, and therefore, won.
    if ([newColorBlocks, ...originBlocks].length === gameboard.length*gameboard.length) {
        setGameState({ ...gameState, victory: true })
        
        // changing highscore state dinamically to optimize code
        if (gameState.moves < highscores[gameState.difficulty] || highscores[gameState.difficulty] === 0) setHighscores({ ...highscores, [gameState.difficulty]: gameState.moves })
    }

    // final objective of this function is not to return something, but to change
    // the state of the current gameboard, which updates to the new one.
    setGameboard(gameboardAux)
}

const Selector: React.FC<SelectorType> = (props) => {
    const { gameState, setGameState, gameboard, setGameboard, highscores, setHighscores } = props

    return (
        <div className="flex flex-row gap-7 sm:gap-10 justify-center mt-[10px] pb-[20px]">
            <div className={`bg-[#C6262E] w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] rounded-md cursor-pointer flex items-center justify-center`}
                onClick={() => handleMove('red', gameboard, setGameState, gameState, setGameboard, highscores, setHighscores)}>
                {gameState.icons && <FaAppleAlt className='text-white text-2xl sm:text-3xl' />}
            </div>

            <div className={`bg-[#F9C541] w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] rounded-md cursor-pointer flex items-center justify-center`}
                onClick={() => handleMove('yellow', gameboard, setGameState, gameState, setGameboard, highscores, setHighscores)}>
                {gameState.icons && <AiFillStar className='text-white text-2xl sm:text-3xl' />}
            </div>

            <div className={`bg-[#68B622] w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] rounded-md cursor-pointer flex items-center justify-center`}
                onClick={() => handleMove('green', gameboard, setGameState, gameState, setGameboard, highscores, setHighscores)}>
                {gameState.icons && <IoMdFlower className='text-white text-2xl sm:text-3xl' />}
            </div>

            <div className={`bg-[#3689E6] w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] rounded-md cursor-pointer flex items-center justify-center`}
                onClick={() => handleMove('blue', gameboard, setGameState, gameState, setGameboard, highscores, setHighscores)}>
                {gameState.icons && <FaAnchor className='text-white text-2xl sm:text-3xl' />}
            </div>

            <div className={`bg-[#A56CE3] w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] rounded-md cursor-pointer flex items-center justify-center`}
                onClick={() => handleMove('purple', gameboard, setGameState, gameState, setGameboard, highscores, setHighscores)}>
                {gameState.icons && <FaPaw className='text-white text-2xl sm:text-3xl' />}
            </div>

            <div className={`bg-[#F4679D] w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] rounded-md cursor-pointer flex items-center justify-center`}
                onClick={() => handleMove('pink', gameboard, setGameState, gameState, setGameboard, highscores, setHighscores)}>
                {gameState.icons && <FaBasketballBall className='text-white text-2xl sm:text-3xl' />}
            </div>

        </div>
    )
}

export default Selector