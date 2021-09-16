const delay = async () => {
  return new Promise(r => setTimeout(r, 60000)) // 60 seconds
}

export default delay