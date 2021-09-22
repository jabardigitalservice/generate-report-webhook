const gitOptions = {
  delay: 10000,
  attempts: 5,
  priority: 1,
  removeOnComplete: true,
  backoff: 5000,
  timeout: 30000
}

const elasticOptions = {
  delay: 10000,
  priority: 2,
  removeOnComplete: true,
  backoff: 5000,
  timeout: 10000
}

export {
  gitOptions,
  elasticOptions
}