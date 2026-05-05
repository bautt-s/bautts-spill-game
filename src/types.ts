import { Difficulty, ColorName } from './constants'

export type Block = {
    id: number
    color: ColorName
}

export type Gameboard = Block[][]

export type GameState = {
    difficulty: Difficulty
    darkMode: boolean
    victory: boolean
    icons: boolean
    games: number
    moves: number
}

export type Highscores = Record<Difficulty, number>
