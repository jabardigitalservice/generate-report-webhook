import { TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions'
import input from 'input'
import config from '../config'

const stringSession = new StringSession('')
const client = new TelegramClient(stringSession, Number(config.get('api.id')), config.get('api.hash'), {
  connectionRetries: 5
})

const connectTelegram = async () => {
  await client.start({
    phoneNumber: async () => await input.text('Please enter your number: '),
    password: async () => await input.password('Please enter your password: '),
    phoneCode: async () => await input.text('Please enter the code you received: '),
    onError: (err) => console.log(err)
  })
  console.log('You should now be connected.')
  console.log(client.session.save()) // Save this string to avoid logging in again
}

connectTelegram()
