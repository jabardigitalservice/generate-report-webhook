import fs from 'fs'
import captureScreenshot from '../capture/screenshot'
import { sendBodyIsValid } from './elastic'
import config from '../config'
import { formatByCreated, formatByReview } from '../template/message'
import { sendMessageWithBot, sendMessageWithUser, sendPhotoWithBot } from '../utils/telegram'
import { bodyInterface } from '../interface'

const CHAT_ID = Number(config.get('chat.id'))
const TELEGRAM_BOT = config.get('telegram.bot')

const sendTelegram = async (payload: bodyInterface): Promise<void> => {
  try {
    const picture = await captureScreenshot(payload.url)
    const messageByCreated = formatByCreated(payload)
    const messageByReview = formatByReview(payload)
    if (!picture) {
      sendMessageWithBot(TELEGRAM_BOT, CHAT_ID, messageByCreated)
      sendMessageWithBot(TELEGRAM_BOT, CHAT_ID, messageByReview)
    } else {
      const messageId = await sendPhotoWithBot(TELEGRAM_BOT, CHAT_ID, picture)
      sendMessageWithUser(CHAT_ID, messageByCreated, messageId)
      sendMessageWithUser(CHAT_ID, messageByReview, messageId)
      fs.unlinkSync(picture)
    }
    sendBodyIsValid(payload)
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export default sendTelegram
