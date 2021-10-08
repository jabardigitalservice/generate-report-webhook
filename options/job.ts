const gitOptions = {
  delay: 10000,
  attempts: 10,
  priority: 1,
  removeOnFail: true,
  removeOnComplete: true,
  backoff: 5000,
  timeout: 30000
}

const elasticOptions = {
  delay: 30000,
  priority: 3,
  removeOnComplete: true,
  removeOnFail: true,
  backoff: 20000,
  timeout: 10000
}

export {
  gitOptions,
  elasticOptions
}
