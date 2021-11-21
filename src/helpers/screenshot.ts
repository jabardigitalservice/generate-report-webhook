import request from 'request'
import fs from 'fs'
import sendRequest from './request'
import config from '../config'
import captureException from '../config/sentry'

const DIR = config.get('dir')

const generateFilePath = (): string => {
  if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR)
  }
  return `${DIR}/${Date.now()}${Math.random()}.png`
}

const downloadImage = async (url: string): Promise<string | null> => {
  const filePath = generateFilePath()
  return new Promise((resolve) => {
    request.head(url, () => {
      request(url)
        .pipe(fs.createWriteStream(filePath))
        .on('close', () => {
          resolve(filePath)
        })
        .on('error', () => {
          resolve(null)
        })
    })
  })
}

const screenshot = async (url: string): Promise<string | null> => {
  try {
    const response = await sendRequest({
      url: config.get('screenshot.url'),
      method: 'POST',
      form: {
        url: decodeURIComponent(url),
      },
    })
    if (response.statusCode !== 200) return null
    if (response.body) return await downloadImage(response.body)
  } catch (error) {
    captureException(error)
    return null
  }
}

export default screenshot
