const delay = async () => {
  return new Promise(r => setTimeout(r, 3000)) // 1 second
}

export default delay