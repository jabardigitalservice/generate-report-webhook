const delay = (): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, 5000))
}

export default delay
