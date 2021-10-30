import { mergedOption } from '../config/git'

const isMerged = (git: string, body: any): boolean => {
  const locations = mergedOption[git].locations
  let state = body
  for (const location of locations) {
    state = state[location]
  }

  let conditionAdd = true
  if (git === 'github') {
    conditionAdd = body.pull_request.merged
  }

  return state === mergedOption[git].condition && conditionAdd
}

export default isMerged
