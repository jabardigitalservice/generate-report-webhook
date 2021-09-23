import { mergedOptions } from '../options/git'

const isMerged = (git, body) => {
  const locations = mergedOptions[git].locations
  let state = body
  for (const location of locations) {
    state = state[location]
  }

  let conditionAdd = true
  if (git === 'github') {
    conditionAdd = body.pull_request.merged
  }

  return state === mergedOptions[git].condition && conditionAdd
}

export default isMerged
