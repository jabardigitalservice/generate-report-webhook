import request from 'request'

const sendRequest = async ({ url, formData }) => {
  return new Promise((resolve, reject) => {
    request.post(
      {
        url,
        formData
      },
      function cb (err, res, body) {
        if (err) {
          console.log('error', err);
          reject(err)
        } else {
          resolve(body)
        }
      }
    )
  })
}

export default sendRequest
