const delay = async () => {
  return new Promise(resolve => setTimeout(resolve, 30000)) // 30 seconds
}

export default delay
