
import {Keyboard as KB, Key, KeyboardButton} from 'telegram-keyboard'
import {IKeyboard} from "./types"

 

class Keyboard {

    static keyboard(id: string , board: Array<number>): IKeyboard {

        let cells: KeyboardButton[] = []


        let numberOfCells: number = 0
        board.forEach(cell => {

            cells = [...cells,Key.callback(cell == 1 ? '❌' : cell == 2 ? '⭕' : '⬜', `pos;${numberOfCells};${id}`)]
            numberOfCells += 1

        })

        const kb = KB.make(cells, {
        columns: 3,
        wrap: function (row: number[] | string[] | KeyboardButton[], index: number, rowIndex: number, button: string | number | KeyboardButton): boolean {
            return true
        },
        filter: function (button: string | number | KeyboardButton, index: number, buttons: number[] | string[] | KeyboardButton[]): boolean {
            return true
        },
        filterAfterBuild: false,
        flat: false,
        pattern: []
    })

        return kb.inline()
    }

}


export default Keyboard