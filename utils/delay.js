const delay = async () => {
  return new Promise(r => setTimeout(r, 30000)) // 30 seconds
}

export default delay