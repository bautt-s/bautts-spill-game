import React, { memo } from 'react'
import { PIXEL_SIZES } from '../constants'
import { GameState, Gameboard as GameboardType } from '../types'
import { COLOR_ICONS } from '../color-icons'

type GameboardProps = {
    gameboard: GameboardType
    gameState: GameState
}

const Gameboard: React.FC<GameboardProps> = ({ gameboard, gameState }) => {
    const { difficulty, icons } = gameState
    const pixelSizeClass = `size-${PIXEL_SIZES[difficulty]}`
    const iconSizeClass = difficulty === 'hard' ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'

    return (
        <div className="w-full pb-[20px] px-[5px] sm:px-[15px]">
            <div className='flex flex-col items-center'>
                {gameboard.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-row">
                        {row.map((value) => {
                            const Icon = COLOR_ICONS[value.color]
                            const isOrigin = value.id === 0 && gameState.moves === 0
                            return (
                                <div
                                    key={value.id}
                                    className={`${isOrigin ? 'border-[2px] border-white dark:border-white border-dashed' : 'border-r-[1px] border-b-[1px]'}
                                    dark:border-[#323332] flex items-center justify-center ${pixelSizeClass} ${value.color} transition-colors duration-300`}
                                >
                                    {icons && <Icon className={`text-white ${iconSizeClass}`} aria-hidden="true" />}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(Gameboard)
