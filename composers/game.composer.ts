import {Composer} from 'telegraf'
import {Telegraf,Context} from "telegraf"
import { InlineQueryResult } from 'telegraf/typings/core/types/typegram'
import {Keyboard, Key} from "telegram-keyboard"
import {BotContext, Game} from "./../types"
import TicTacToe from './../TicTacToe'
import victoryCheck from "./../methods/victoryCheck"
import TelegrafI18n from 'telegraf-i18n'
import boardToString from "./../methods/boardToString"
import inlineQuery from './../inlineQuery'
import * as path from 'path';

const composer = new Composer<BotContext>()

composer.on('inline_query',inlineQuery)
composer.hears(/^\/play/, async (ctx) => {
 
    const turn = ctx.message.text.split(' ')[1] || 1
    const game = new TicTacToe(ctx,Number(turn))
    const id = game.id

    ctx.games[id] = game
    ctx.replyWithHTML(ctx.i18n.t('game_message', {player1: game.player1, player2: game.player2HTML, step: game.turnPlayer}), {reply_markup: game.keyboard.reply_markup, disable_web_page_preview: true} )

})
composer.action(/^pos/, async (ctx,next) => {

    const query: string[] = <string[]>ctx?.update?.callback_query?.data?.split(';')

    const ID = <string>query[2]
    const pos = Number(query[1])
    

    if(typeof ID !== 'string') return await next()

    const game = ctx.games[ID]

    if(game.status == 'started' && !game.isPlayer(ctx)){
        ctx.answerCbQuery('Игра уже началась')
        return await next()
    }

    if(game.status == 'waiting' && game.player1.id !== ctx?.from?.id){
        game.invitePlayer(ctx)
    }

    if(game.turnPlayer.id !== ctx?.from?.id){
        ctx.answerCbQuery('Сейчас не ваш ход')
        return await next()
    }

    if(!game.isAvailable(pos)){
        ctx.answerCbQuery('Клетка уже занята')
        return await next()
    }


    game.play(pos)

    if(game.isDraw && !game.isWin){

        const layout = boardToString(game.board)
        ctx.editMessageText(ctx.i18n.t('draw_message', {player1: game.player1, player2: game.player2, layout}), {parse_mode: 'HTML', disable_web_page_preview: true})
        return await next()
    }
    
    else if(!game.isDraw && game.isWin){
 
        const results = victoryCheck(game.board)
        const winner = results == 1 ? game.player1 : game.player2
        const loser = results == 1 ? game.player2 : game.player1
        const layout = boardToString(game.board)

        ctx.editMessageText(ctx.i18n.t('win_message', {winner, loser, layout}), {parse_mode: 'HTML', disable_web_page_preview: true})
         

    }
    else {

        ctx.editMessageText(ctx.i18n.t('game_message', {player1: game.player1, player2: game.player2HTML, step: game.turnPlayer}), {reply_markup: game.keyboard.reply_markup, parse_mode: 'HTML', disable_web_page_preview: true})

    }
    ctx.answerCbQuery()


    return await next()
     
})

 

export default composer


