import {Telegraf,Context} from "telegraf"
import { InlineQueryResult } from 'telegraf/typings/core/types/typegram'
import {Keyboard, Key} from "telegram-keyboard"
import {BotContext, Game} from "./types"
import TicTacToe from './TicTacToe'
import victoryCheck from "./methods/victoryCheck"
import TelegrafI18n from 'telegraf-i18n'
import boardToString from "./methods/boardToString"
import inlineQuery from './inlineQuery'
import * as path from 'path';
import composer from './composers/game.composer'
const bot = new Telegraf<BotContext>('5143243912:AAHxxR6Ak4HHVzpKsKAFra6xXWxDxk4VWWo')
 
bot.context.games = {}
const i18n = new TelegrafI18n({
    defaultLanguage: 'en',
    defaultLanguageOnMissing: true,
    directory:'C:/Users/Администратор/Desktop/ts/locales'
})
bot.use(i18n.middleware())
bot.use(composer.middleware())
bot.command('start', async ctx => {

    const botUsername = await ctx.telegram.getMe()
    console.log(botUsername)
    const kb = Keyboard.make([
        Key.switchToChat('Играть с другом', '')
    ]).inline()
    ctx.reply(ctx.i18n.t('start_message'), kb)

})

 
bot.launch()