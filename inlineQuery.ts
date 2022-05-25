import {Context} from 'telegraf'
import shaffle from './methods/shaffle'
import { InlineQueryResult } from 'telegraf/typings/core/types/typegram'

async function inlineQuery(ctx: Context){

    try{

        ctx.answerInlineQuery([{


            type: 'photo',
            id: Math.random() * 1e16,
            thumb_url: 'AgACAgIAAxkBAAILdGJvp53R16Q8aslwD4bvXRhZDeEbAALDuTEb6sGBS6LxYTeCV4JrAQADAgADcwADJAQ',
            photo_url: 'AgACAgIAAxkBAAILdGJvp53R16Q8aslwD4bvXRhZDeEbAALDuTEb6sGBS6LxYTeCV4JrAQADAgADcwADJAQ',
            message_text: '/play 1'
        } as unknown as InlineQueryResult,{


            type: 'photo',
            id: Math.random() * 1e16,
            thumb_url: 'AgACAgIAAxkBAAILq2Jvr-Hs8i58pTuQvjWYc2G6c2-SAAK_uTEb6sGBSxVpcEVF5d3pAQADAgADcwADJAQ',
            photo_url: 'AgACAgIAAxkBAAILq2Jvr-Hs8i58pTuQvjWYc2G6c2-SAAK_uTEb6sGBSxVpcEVF5d3pAQADAgADcwADJAQ',
            message_text: '/play 2'
        } as unknown as InlineQueryResult,{
            type: 'photo',
            id: Math.random() * 1e16,
            thumb_url: 'AgACAgIAAxkBAAILsmJvs3OFhRxhB7p4poYs9GpE48WKAAKQujEb6sGBS4pJxm9AY3mpAQADAgADcwADJAQ',
            photo_url: 'AgACAgIAAxkBAAILsmJvs3OFhRxhB7p4poYs9GpE48WKAAKQujEb6sGBS4pJxm9AY3mpAQADAgADcwADJAQ',
            message_text: `/play ${shaffle([1,2])}`,
            
        } as unknown as InlineQueryResult])

    }catch{

    }

}

export default inlineQuery