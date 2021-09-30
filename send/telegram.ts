import fs from 'fs'
import captureScreenshot from '../capture/screenshot'
import { sendBodyIsValid } from './elastic'
import config from '../config'
import { messageValid } from '../template/message'
import { sendMessageWithBot, sendMessageWithUser, sendPhotoWithBot } from '../utils/telegram'
import { bodyInterface } from '../interface'

const CHAT_ID = Number(config.get('chat.id'))
const TELEGRAM_BOT = config.get('telegram.bot')

const sendTelegram = async (payload: bodyInterface): Promise<void> => {
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
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export default sendTelegram
