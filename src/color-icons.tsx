import { FaPaw, FaAnchor, FaAppleAlt, FaBasketballBall } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'
import { IoMdFlower } from 'react-icons/io'
import { IconType } from 'react-icons'
import { ColorName } from './constants'

export const COLOR_ICONS: Record<ColorName, IconType> = {
    red: FaAppleAlt,
    yellow: AiFillStar,
    green: IoMdFlower,
    blue: FaAnchor,
    purple: FaPaw,
    pink: FaBasketballBall,
}
