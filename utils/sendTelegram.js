import fs from 'fs'
import request from 'request'
import dotEnv from 'dotenv'
import { Api, TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions/index.js'
import random from 'random-bigint'
import screenshot from './screenshot.js'
import { sendBodyIsValid } from './sendElastic.js'

dotEnv.config()

const apiId = process.env.API_ID
const apiHash = process.env.API_HASH
const apiSession = process.env.API_SESSION
const stringSession = new StringSession(apiSession)

const TELEGRAM_BOT = process.env.TELEGRAM_BOT
const CHAT_ID = process.env.CHAT_ID
const apiTelegram = `https://api.telegram.org/${TELEGRAM_BOT}`
const client = new TelegramClient(stringSession, Number(apiId), apiHash, {})

const message = (payload) => {
  return `
/lapor ${payload.project} | ${payload.title}
Peserta: ${payload.participants}
Lampiran: ${payload.url}
`
}

const sendMessage = async (payload, replyToMsgId) => {
  if (!client.connected) await client.connect()
  await client.invoke(
    new Api.messages.SendMessage({
      peer: Number(CHAT_ID),
      message: message(payload),
      randomId: random(128),
      noWebpage: true,
      replyToMsgId: Number(replyToMsgId)
    })
  )
  sendBodyIsValid(payload)
}

const sendMessageWithBot = (payload) => {
  request.post(
    {
      url: apiTelegram + '/sendMessage',
      formData: {
        chat_id: Number(CHAT_ID),
        text: message(payload)
      }
    },
    function cb (err) {
      if (err) {
        return console.error('send message failed:', err)
      }
      sendBodyIsValid(payload)
    }
  )
}

const sendPhoto = (payload) => {
  request.post(
    {
      url: apiTelegram + '/sendPhoto',
      formData: {
        chat_id: Number(CHAT_ID),
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
      sendMessage(payload, messageId)
    }
  )
}

const sendTelegram = async (git, payload) => {
  try {
    const image = await screenshot(payload.url, git)
    if (!image) return sendMessageWithBot(payload)
    sendPhoto(Object.assign(payload, { picture: image }))
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export default sendTelegram
