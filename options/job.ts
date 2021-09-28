const gitOptions = {
  delay: 10000,
  attempts: 10,
  priority: 1,
  removeOnComplete: true,
  backoff: 5000,
  timeout: 30000
}

const elasticOptions = {
  delay: 30000,
  priority: 3,
  removeOnComplete: true,
  backoff: 5000,
  timeout: 5000
}

export {
  gitOptions,
  elasticOptions
}
