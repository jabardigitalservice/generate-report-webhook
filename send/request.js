import request from 'request'

const sendRequest = async ({ url, formData }) => {
  return new Promise((resolve) => {
    request.post(
      {
        url,
        formData
      },
      function cb (err, res, body) {
        if (err) throw new Error(err)
        else resolve(JSON.parse(body))
      }
    )
  })
}

export default sendRequest
