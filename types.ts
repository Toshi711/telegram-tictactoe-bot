import {Context} from 'telegraf'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram'
import Duet from './Duet'
import TicTacToe from './TicTacToe'
export interface IPlayer{
    id: number,
    username: string,
    name: string,
    moves?: number[]
    
}

export interface Game {
    [key: string] : TicTacToe
}

 
export interface BotContext extends Context {

    games: Game,
    i18n: any


}

export interface IInlineQuery {

    type: string,
    id: number,
    thumb_url?: string,
    photo_url?: string,
    message_text: string,
}
export interface IKeyboard extends ExtraReplyMessage {
    
    reply_markup: InlineKeyboardMarkup
}


