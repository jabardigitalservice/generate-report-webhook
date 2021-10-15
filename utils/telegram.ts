import fs from 'fs'
import { Api, TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions'
import random from 'random-bigint'
import config from '../config'
import sendRequest from './request'

const telegramApi = config.get('telegram.api')
const client = new TelegramClient(new StringSession(config.get('api.session')), Number(config.get('api.id')), config.get('api.hash'), {})

const sendMessageWithUser = async (chatId: number, message: string, replyToMsgId?: number) => {
  if (client.disconnected) await client.connect()
  return client.invoke(
    new Api.messages.SendMessage({
      peer: chatId,
      message: message,
      randomId: random(128),
      noWebpage: true,
      replyToMsgId: replyToMsgId
    })
  )
}

const sendMessageWithBot = async (telegramBot: string, chatId: number, message?: string): Promise<void> => {
  if (!message) return
  await sendRequest({
    url: `${telegramApi}/${telegramBot}/sendMessage`,
    formData: {
      chat_id: chatId,
      text: message
    }
  })
}

const sendPhotoWithBot = async (telegramBot: string, chatId: number, picture?: string): Promise<number | null> => {
  if (!picture) return null
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
  if (response.statusCode !== 200) return null
  const body = JSON.parse(response.body)
  const { message_id: messageId } = body.result
  return Number(messageId)
}

export {
  sendMessageWithUser,
  sendMessageWithBot,
  sendPhotoWithBot
}
