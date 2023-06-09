import { FaPaw, FaAnchor, FaAppleAlt, FaBasketballBall } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'
import { IoMdFlower } from 'react-icons/io'

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

    const generatePixelSize = () => {
        let pixelSize;
    
        if (difficulty === 'easy') {
            pixelSize = 114;
        } else if (difficulty === 'medium') {
            pixelSize = 57;
        } else if (difficulty === 'hard') {
            pixelSize = 38;
        } else {
            throw new Error('Invalid difficulty level');
        }
    
        return pixelSize
    }

    const pixelSize = `size-${generatePixelSize()}`

    return (
        <div className="w-full pb-[25px] px-[15px] ">
            <div className='w-[570px]'>
                {gameboard.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className="flex flex-row">
                            {row.map((value, colIndex) => {
                                return (
                                    <div key={colIndex} className={`${pixelSize} ${value.color} border-r-[1px] border-b-[1px] dark:border-[#323332] flex items-center justify-center`}>
                                        {(icons && value.color === 'red') && <FaAppleAlt className={`text-white ${(pixelSize === 'size-38') ? 'text-xl' : 'text-3xl'}`} />}
                                        {(icons && value.color === 'yellow') && <AiFillStar className={`text-white ${(pixelSize === 'size-38') ? 'text-xl' : 'text-3xl'}`} />}
                                        {(icons && value.color === 'green') && <IoMdFlower className={`text-white ${(pixelSize === 'size-38') ? 'text-xl' : 'text-3xl'}`} />}
                                        {(icons && value.color === 'blue') && <FaAnchor className={`text-white ${(pixelSize === 'size-38') ? 'text-xl' : 'text-3xl'}`} />}
                                        {(icons && value.color === 'purple') && <FaPaw className={`text-white ${(pixelSize === 'size-38') ? 'text-xl' : 'text-3xl'}`} />}
                                        {(icons && value.color === 'brown') && <FaBasketballBall className={`text-white ${(pixelSize === 'size-38') ? 'text-xl' : 'text-3xl'}`} />}
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