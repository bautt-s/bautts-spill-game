import { FaPaw, FaAnchor, FaAppleAlt, FaBasketballBall } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'
import { IoMdFlower } from 'react-icons/io'

// typing used for component props
type GameboardProps = {
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
}

const Gameboard: React.FC<GameboardProps> = (props) => {
    const { gameState, gameboard } = props
    const { difficulty, icons } = gameState

    // this function returns a certain number based on difficulty level
    // this number is then used to make a CSS class name, and used for
    // each block dimensions (squared and also responsible)
    const generatePixelSize = () => {
        let pixelSize;
    
        if (difficulty === 'easy') pixelSize = 114;
        else if (difficulty === 'medium') pixelSize = 57;
        else if (difficulty === 'hard') pixelSize = 38;
        else throw new Error('Invalid difficulty level');
        
        return pixelSize
    }

    const pixelSize = `size-${generatePixelSize()}`

    return (
        <div className="w-full pb-[25px] px-[5px] sm:px-[15px]">
            <div className='w-[390px] sm:w-[570px]'>
                {gameboard.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className="flex flex-row">
                            {row.map((value, colIndex) => {
                                return (
                                    <div key={colIndex} className={`${pixelSize} ${value.color} id-${value.id} border-r-[1px] border-b-[1px] dark:border-[#323332] flex items-center justify-center`}>
                                        {(icons && value.color === 'red') && <FaAppleAlt className={`text-white ${(pixelSize === 'size-38') ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'}`} />}
                                        {(icons && value.color === 'yellow') && <AiFillStar className={`text-white ${(pixelSize === 'size-38') ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'}`} />}
                                        {(icons && value.color === 'green') && <IoMdFlower className={`text-white ${(pixelSize === 'size-38') ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'}`} />}
                                        {(icons && value.color === 'blue') && <FaAnchor className={`text-white ${(pixelSize === 'size-38') ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'}`} />}
                                        {(icons && value.color === 'purple') && <FaPaw className={`text-white ${(pixelSize === 'size-38') ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'}`} />}
                                        {(icons && value.color === 'pink') && <FaBasketballBall className={`text-white ${(pixelSize === 'size-38') ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'}`} />}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Gameboard