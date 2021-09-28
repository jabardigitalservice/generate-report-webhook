import bodyParser from 'body-parser'
import express from 'express'
import verifySecretKey from './utils/verifySecretKey'
import connectQueue from './connect/queue'
import isMerged from './utils/isMerged'
import { gitOptions } from './options/job'
import config from './config'

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
    const body = req.body
    queue.add({ git, body }, gitOptions).then(() => {
      console.log(`add queue ${git} ${new Date()}`)
    })
    return res.send('success')
  } catch (error: any) {
    console.log(error.message)
    return res.status(403).json({ error: error.message })
  }
})

const PORT = config.get('port')
app.listen(PORT, () => {
  console.log(`App listening at http://0.0.0.0:${PORT}`)
})
