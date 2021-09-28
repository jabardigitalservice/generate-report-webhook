import fs from 'fs'
import captureScreenshot from '../capture/screenshot'
import { sendBodyIsValid } from './elastic'
import Config from '../config'
import { messageValid } from '../template/message'
import { sendMessageWithBot, sendMessageWithUser, sendPhotoWithBot } from '../utils/telegram'
import { bodyInterface } from '../interface'

const CHAT_ID = Number(Config.get('chat.id'))
const TELEGRAM_BOT = Config.get('telegram.bot')

const sendTelegram = async (payload: bodyInterface) => {
  try {
    const picture = await captureScreenshot(payload.url)
    const message = messageValid(payload)
    if (!picture) {
      await sendMessageWithBot(TELEGRAM_BOT, CHAT_ID, message)
    } else {
      const messageId = await sendPhotoWithBot(TELEGRAM_BOT, CHAT_ID, picture)
      await sendMessageWithUser(CHAT_ID, message, messageId)
      fs.unlinkSync(picture)
    }
    sendBodyIsValid(payload)
    return true
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export default sendTelegram
