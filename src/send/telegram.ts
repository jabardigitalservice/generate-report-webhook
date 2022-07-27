import fs from 'fs'
import captureScreenshot from '../helpers/screenshot'
import { sendBodyIsValid } from './elastic'
import config from '../config'
import { formatByCreated, formatByReview } from '../template/message'
import { sendMessageWithBot, sendPhotoWithBot } from '../helpers/telegram'
import { BodyInterface } from '../interface'
import { telegramSendUser } from '../config/queue'
import { gitOptions } from '../config/job'

const CHAT_ID = Number(config.get('chat.id'))
const TELEGRAM_BOT = config.get('telegram.bot')

const sendTelegram = async (payload: BodyInterface): Promise<void> => {
  const messageByCreated = formatByCreated(payload)
  const messageByReview = formatByReview(payload)
  const picture = await captureScreenshot(payload.screenshot ? payload.screenshot : payload.url)
  const messageId = await sendPhotoWithBot(TELEGRAM_BOT, CHAT_ID, picture)

  if (picture && messageId) {
    telegramSendUser.add({ chat_id: CHAT_ID, message: messageByCreated, message_id: messageId }, gitOptions)
    telegramSendUser.add({ chat_id: CHAT_ID, message: messageByReview, message_id: messageId }, gitOptions)
    fs.unlinkSync(picture)
  } else {
    sendMessageWithBot(TELEGRAM_BOT, CHAT_ID, messageByCreated)
    sendMessageWithBot(TELEGRAM_BOT, CHAT_ID, messageByReview)
  }

  sendBodyIsValid(payload)
}

export default sendTelegram
