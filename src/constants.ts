export type Difficulty = 'easy' | 'medium' | 'hard'

export type ColorName = 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink'

export const COLORS: { name: ColorName; hex: string }[] = [
    { name: 'red',    hex: '#C6262E' },
    { name: 'yellow', hex: '#F9C541' },
    { name: 'green',  hex: '#68B622' },
    { name: 'blue',   hex: '#3689E6' },
    { name: 'purple', hex: '#A56CE3' },
    { name: 'pink',   hex: '#F4679D' },
]

export const BOARD_SIZES: Record<Difficulty, number> = {
    easy: 5,
    medium: 10,
    hard: 15,
}

export const PIXEL_SIZES: Record<Difficulty, number> = {
    easy: 114,
    medium: 57,
    hard: 38,
}

export const HIGHSCORES_STORAGE_KEY = 'SPILLGAME_HIGHSCORES'
