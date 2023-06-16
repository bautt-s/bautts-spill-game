import { BsArrowRight } from "react-icons/bs"

const darkModeImg = require('../images/darkMode.png')
const lightModeImg = require('../images/lightMode.png')

type HelpProps = {
    darkMode: boolean
    setModalHelp: Function
}

const HelpModal: React.FC<HelpProps> = (props) => {
    const { darkMode, setModalHelp } = props

    return (
        <div className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center">
            <div className='bg-[#00000060] w-screen h-screen absolute z-1 backdrop-blur-sm' onClick={() => setModalHelp(false)}></div>

            <div className="bg-white dark:bg-[#323332] flex flex-col items-center w-[380px] sm:w-[400px] z-50 
            px-[20px] py-[40px] rounded-md dark:shadow-[#323332] dark:shadow-xl dark:text-white">
                <div className="flex flex-col items-center">
                    <img src={darkMode ? darkModeImg : lightModeImg} className="w-[80%] h-auto" />
                    <BsArrowRight className="text-4xl relative bottom-[315px] right-[140px] text-black dark:text-white" />
                </div>

                <h3 className="text-lg font-bold">The objective of the game is to fill the board with one color, in the smallest amount of steps possible.</h3>

                <p className="mt-[20px]">
                    To add a new paint color to the board (starting from the top-left corner), simply tap on the paint buttons located at the bottom of the game. 
                    <br /><br />As you do so, the newly spilled paint will merge with adjacent squares of the same color, increasing the overall filled space on the board.
                </p>
            </div>
        </div>
    )
}

export default HelpModal