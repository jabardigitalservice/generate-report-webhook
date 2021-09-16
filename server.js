import dotEnv from 'dotenv'
import bodyParser from 'body-parser'
import express from 'express'
import verifySecretKey from './utils/verifySecretKey.js'
import { connectQueue, optionQueue } from './utils/connectQueue.js'
import isMerged from './utils/isMerged.js'
dotEnv.config()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendStatus(404)
})

app.post('/webhook/:secret/:git', async (req, res) => {
  try {
    await verifySecretKey(req.params.secret)
    const git = req.params.git
    if (!isMerged(git, req.body)) return res.send('pending ...')
    const queue = connectQueue(git)
    queue.add({ git: git, body: req.body }, optionQueue).then(() => {
      console.log(`has been added to the queue: ${git}`)
    })
    return res.send('success')
  } catch (error) {
    console.log(error.message)
    return res.status(403).json({ error: error.message })
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App listening at http://0.0.0.0:${PORT}`)
})
