import fs from 'fs'
import { Api, TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions/index.js'
import random from 'random-bigint'
import captureScreenshot from '../capture/screenshot.js'
import { sendBodyIsValid } from '../send/elastic.js'
import Config from '../config/index.js'
import { messageValid } from '../template/message.js'
import request from 'request'

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

const sendMessageWithBoth = (message) => {
  request.post(
    {
      url: apiTelegram + '/sendMessage',
      formData: {
        chat_id: CHAT_ID,
        text: message
      }
    },
    function cb (err) {
      if (err) {
        return console.error('send message failed:', err)
      }
    }
  )
}

const sendPhotoWithReplyMessage = (picture, message) => {
  request.post(
    {
      url: apiTelegram + '/sendPhoto',
      formData: {
        chat_id: Number(CHAT_ID),
        photo: {
          value: fs.createReadStream(picture),
          options: {
            filename: picture,
            contentType: 'image/png'
          }
        }
      }
    },
    function cb (err, response) {
      if (err) {
        return console.error('send photo failed:', err)
      }
      const body = JSON.parse(response.body)
      const { message_id: messageId } = body.result
      sendMessageWithUser(message, Number(messageId))
    }
  )
}

const sendTelegram = async (git, payload) => {
  try {
    const picture = await captureScreenshot(payload.url, git)
    const message = messageValid(payload)
    sendBodyIsValid(payload)
    if (!picture) return sendMessageWithBoth(message)
    sendPhotoWithReplyMessage(picture, message)
    fs.unlinkSync(picture)
    return true
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export {
  sendTelegram,
  sendPhotoWithReplyMessage,
  sendMessageWithBoth,
  sendMessageWithUser
}
