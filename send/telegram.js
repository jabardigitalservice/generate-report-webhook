import fs from 'fs'
import request from 'request'
import { Api, TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions/index.js'
import random from 'random-bigint'
import screenshot from './screenshot.js'
import { sendBodyIsValid } from './sendElastic.js'
import Config from '../config/index.js'
import { messageValid } from './messages.js'

const CHAT_ID = Number(Config.get('chat_id'))
const apiTelegram = `https://api.telegram.org/${Config.get('telegram.bot')}`
const client = new TelegramClient(new StringSession(Config.get('api.session')), Number(Config.get('api.id')), Config.get('api.hash'), {})

const sendMessage = async (message, replyToMsgId) => {
  if (client.disconnected) await client.connect()
  await client.invoke(
    new Api.messages.SendMessage({
      peer: CHAT_ID,
      message: message,
      randomId: random(128),
      noWebpage: true,
      replyToMsgId: Number(replyToMsgId)
    })
  )
}

const sendMessageWithBot = (message) => {
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

const sendPhoto = (payload) => {
  request.post(
    {
      url: apiTelegram + '/sendPhoto',
      formData: {
        chat_id: CHAT_ID,
        photo: {
          value: fs.createReadStream(payload.picture),
          options: {
            filename: payload.picture,
            contentType: 'image/png'
          }
        }
      }
    },
    function cb (err, response) {
      fs.unlinkSync(payload.picture)
      if (err) {
        return console.error('send photo failed:', err)
      }
      const body = JSON.parse(response.body)
      const { message_id: messageId } = body.result
      sendMessage(messageValid(payload), messageId)
    }
  )
}

const sendTelegram = async (git, payload) => {
  try {
    const image = await screenshot(payload.url, git)
    if (!image) sendMessageWithBot(messageValid(payload))
    else sendPhoto(Object.assign(payload, { picture: image }))
    sendBodyIsValid(payload)
    return true
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export default sendTelegram
