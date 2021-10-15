import sendRequest from '../utils/request'
import request from 'request'
import config from '../config'
import fs from 'fs'

const DIR = config.get('dir')

const generateFilePath = (): string => {
  if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR)
  }
  return `${DIR}/${Date.now()}${Math.random()}.png`
}

const screenshot = async (url: string): Promise<string | null> => {
  const response = await sendRequest({
    url: config.get('screenshot.url'),
    method: 'POST',
    form: {
      url: decodeURIComponent(url)
    }
  })
  if (response.statusCode !== 200) return null
  if (response.body) return await downloadImage(response.body)
}

const downloadImage = async (url: string): Promise<string | null> => {
  const filePath = generateFilePath()
  return new Promise(resolve => {
    request.head(url, function () {
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

export default screenshot
