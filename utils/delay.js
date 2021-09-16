const delay = async () => {
  return new Promise(r => setTimeout(r, 1000)) // 1 second
}

export default delay