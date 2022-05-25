import Duet from "./Duet";
import {Context} from "telegraf"
import Keyboard from "./Keyboard"
import {IKeyboard, IPlayer} from "./types"

class TicTacToe extends Duet{

    private _board: Array<number>
    private _turn: number
    private _moves: number[] = []
    private _isWin: boolean = false
    private _isDraw: boolean = false

    constructor(ctx: Context, turn: number) {
        super(ctx)
        this._turn = turn
        this._board = Array(9).fill(0)
        this._moves = turn == 2 ? [-1] : []
    }

    play(pos: number): void {

        
        this._board[pos] = this.turn
        this.pushMove(pos)

        this._isWin = /^(?:...)*([12])\1\1|^.?.?([12])..\2..\2|^([12])...\3...\3|^..([12]).\4.\4/.test(this.board.join(""));
        this._isDraw = !this._isWin && this.moves.length === this.board.length;
    
        
    }

    isAvailable(pos: number): boolean {
        return this._board[pos] == 0
    }

    pushMove(pos: number): void {
        this._moves.push(pos)
        if(this.turn == 1){
            this?._player1?.moves?.push(pos)
        } else {
            this?._player2?.moves?.push(pos)
        }
    
    }

    get isDraw(): boolean{
        return this._isDraw
    }
    get isWin(): boolean{
        return this._isWin
    }
    get moves(): number[] {
        return this._moves.filter(move => move !== -1)
    }
    get board(): Array<number> {
        return this._board
    }
    get turn(): number {
        return this._moves.length % 2 + 1
    }
    get turnPlayer(): IPlayer{
        return this.turn == 1 ? this.player1 : this.player2 
    }
    get keyboard(): IKeyboard{
        const kb = Keyboard.keyboard(this.id , this._board)
        return kb
    }
}


export default TicTacToe