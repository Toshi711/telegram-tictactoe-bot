import {Context} from 'telegraf'
import {IPlayer} from './types'
import uid from './methods/uid'

class Duet {

    readonly id: string
 
    private ctx: Context
    protected _player1: IPlayer
    protected _player2: IPlayer

    constructor(ctx: Context){

        this.id = uid()
        
        this.ctx = ctx
        this._player1 = {
            id: ctx?.from?.id as number,
            username: ctx?.from?.username as string,
            name: ctx?.from?.first_name as string,
            moves: []
        }
        this._player2 = {
            id: 0,
            username: '',
            name: '',
            moves: []
        }

    }


    isPlayer(ctx: Context){

        if(ctx?.from?.id == this.player1.id || ctx?.from?.id == this.player2.id) return true

        return false
    }

    get status(): string {
        if(this._player2.id !== 0){

            return 'started'
        }

        return 'waiting'
    }
    get player1(): IPlayer {

        return this._player1

    }

    get player2(): IPlayer {

        return this._player2

    }

    get player2HTML():string {

        return this.player2.id == 0 ? 'Ожидание..' : `<b><a href="https://t.me/${this.player2.username}">${this.player2.name}</a></b>`
        
    }
    
    invitePlayer(ctx: Context): void {
        console.log(this.status)
        if(this.status == 'waiting'){

            this._player2 = {
                id: ctx?.from?.id as number,
                username: ctx?.from?.username as string,
                name: ctx?.from?.first_name as string,
                moves: []
            }
        }
 
    }

 
}


export default Duet