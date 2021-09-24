import fs from 'fs'
import { Api, TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions/index.js'
import random from 'random-bigint'
import captureScreenshot from '../capture/screenshot.js'
import { sendBodyIsValid } from '../send/elastic.js'
import Config from '../config/index.js'
import { messageValid } from '../template/message.js'
import sendRequest from './request.js'

const CHAT_ID = Number(Config.get('chat.id'))
const apiTelegram = `https://api.telegram.org/${Config.get('telegram.bot')}`
const client = new TelegramClient(new StringSession(Config.get('api.session')), Number(Config.get('api.id')), Config.get('api.hash'), {})

const sendMessageWithUser = async (message, replyToMsgId = null) => {
  if (client.disconnected) await client.connect()
  await client.invoke(
    new Api.messages.SendMessage({
      peer: CHAT_ID,
      message: message,
      randomId: random(128),
      noWebpage: true,
      replyToMsgId: replyToMsgId
    })
  )
}

const sendMessageWithBoth = async (message, payload) => {
  const response = await sendRequest({
    url: apiTelegram + '/sendMessage',
    formData: {
      chat_id: CHAT_ID,
      text: message
    }
  })
  if (response.statusCode !== 200) throw new Error(response.statusMessage)
  sendBodyIsValid(payload)
  return true
}

const sendPhotoWithBoth = async (picture) => {
  const response = await sendRequest({
    url: apiTelegram + '/sendPhoto',
    formData: {
      chat_id: CHAT_ID,
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

const sendTelegram = async (git, payload) => {
  try {
    const picture = await captureScreenshot(payload.url, git)
    const message = messageValid(payload)
    if (!picture) return await sendMessageWithBoth(message, payload)
    const messageId = await sendPhotoWithBoth(picture)
    await sendMessageWithUser(message, messageId)
    sendBodyIsValid(payload)
    return true
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export {
  sendTelegram,
  sendPhotoWithBoth,
  sendMessageWithBoth,
  sendMessageWithUser
}
