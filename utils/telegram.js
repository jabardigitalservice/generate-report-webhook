import fs from 'fs'
import { Api, TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions/index.js'
import random from 'random-bigint'
import Config from '../config/index.js'
import sendRequest from './request.js'

const telegramApi = Config.get('telegram.api')
const client = new TelegramClient(new StringSession(Config.get('api.session')), Number(Config.get('api.id')), Config.get('api.hash'), {})

const sendMessageWithUser = async (chatId, message, replyToMsgId = null) => {
  if (client.disconnected) await client.connect()
  await client.invoke(
    new Api.messages.SendMessage({
      peer: chatId,
      message: message,
      randomId: random(128),
      noWebpage: true,
      replyToMsgId: replyToMsgId
    })
  )
}

const sendMessageWithBot = async (telegramBot, chatId, message) => {
  const response = await sendRequest({
    url: `${telegramApi}/${telegramBot}/sendMessage`,
    formData: {
      chat_id: chatId,
      text: message
    }
  })
  if (response.statusCode !== 200) throw new Error(response.statusMessage)
  return true
}

const sendPhotoWithBot = async (telegramBot, chatId, picture) => {
  const response = await sendRequest({
    url: `${telegramApi}/${telegramBot}/sendPhoto`,
    formData: {
      chat_id: chatId,
      photo: {
        value: fs.createReadStream(picture),
        options: {
          filename: picture,
          contentType: 'image/png'
        }
      }
    }
  })
  if (response.statusCode !== 200) throw new Error(response.statusMessage)
  const body = JSON.parse(response.body)
  const { message_id: messageId } = body.result
  return Number(messageId)
}

export {
  sendMessageWithUser,
  sendMessageWithBot,
  sendPhotoWithBot
}
