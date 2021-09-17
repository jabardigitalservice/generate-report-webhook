const delay = async () => {
  return new Promise(resolve => setTimeout(resolve, 10000)) // 10 seconds
}

export default delay
