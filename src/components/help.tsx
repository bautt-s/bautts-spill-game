import React, { useEffect } from 'react'
import darkModeImg from '../images/darkMode.png'
import lightModeImg from '../images/lightMode.png'

type HelpProps = {
    darkMode: boolean
    setModalHelp: React.Dispatch<React.SetStateAction<boolean>>
}

const HelpModal: React.FC<HelpProps> = ({ darkMode, setModalHelp }) => {
    const close = () => setModalHelp(false)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            className="overscroll-y-none w-full h-screen fixed top-0 left-0 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-title"
        >
            <div className='bg-[#00000060] w-full h-screen absolute z-1 backdrop-blur-sm' onClick={close}></div>

            <div className="bg-white dark:bg-[#323332] flex flex-col items-center w-[380px] sm:w-[400px] z-50
            px-[20px] py-[20px] rounded-md dark:shadow-[#323332] dark:shadow-xl dark:text-white">
                <div className="flex flex-col items-center">
                    <img
                        src={darkMode ? darkModeImg : lightModeImg}
                        alt="Example of the Paint & Spill game board"
                        className="h-[220px]"
                    />
                </div>

                <h3 id="help-title" className="text-justify font-bold mt-2">
                    The objective of the game is to fill the board with one color, in the smallest amount of steps possible.
                </h3>

                <p className="mt-[10px]">
                    To add a new paint color to the board (starting from the top-left corner), simply tap on the paint buttons located at the bottom of the game.
                    <br /><br />As you do so, the newly spilled paint will merge with adjacent squares of the same color, increasing the overall filled space on the board.
                </p>
            </div>
        </div>
    )
}

export default HelpModal
