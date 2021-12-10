function getAlignCost(input, goal){
  return input.split(',').map(Number).map(v => Math.abs(v - goal)).reduce((a, b) => a + b)
}

const cache = new Map()

function sigma(goal){
  if(goal === 1) return 1
  if(goal === 0) return 0
  if(cache.get(goal)) return cache.get(goal)
  
  const result = goal + sigma(goal - 1)
  cache.set(goal, result)
  
  return result
}

function getAlignCostWithIncreaseRate(input, goal){
  return input.split(',').map(Number).map(v => Math.abs(v - goal)).map(sigma).reduce((a, b) => a + b)
}

function getMinimumAlignCost(input){
  const arraiedInput = input.split(',').map(Number)
  const minNum = Math.min(...arraiedInput)
  const maxNum = Math.max(...arraiedInput)
  
  return Math.min(...new Array(maxNum - minNum).fill(undefined).map((_, i) => getAlignCostWithIncreaseRate(input, i + minNum)))
}

getMinimumAlignCost(input)
