import request from 'request'

const sendRequest = ({ url, formData }) => {
  return new Promise((resolve, reject) => {
    request.post(
      {
        url,
        formData
      },
      (err, res, body) => {
        if (err && res.statusCode !== 200) reject(err)
        resolve(body)
      }
    )
  })
}

export default sendRequest
