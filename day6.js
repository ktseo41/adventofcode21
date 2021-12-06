function solution(input, goalCount){
  const cacheMap = new Map()
  
  function byOneNumber(number, count){
    if(cacheMap.has(`${number},${count}`)) return cacheMap.get(`${number},${count}`)
    
    const res = (count - number) / 7

    if(res < 0){
      return 0
    }

    const result = Math.ceil(res) + new Array(Math.ceil(res)).fill().map((_, i) => {
      return byOneNumber(8, count - number - 1 - (7 * i))
    }).reduce((a, b) => a + b, 0)
    
    cacheMap.set(`${number},${count}`, result)
    
    return result
  }
  
  return input.split(',').map(Number).map(v => byOneNumber(v, goalCount)).reduce((a, b) => a + b) + input.split(',').length
}

// solution(input, 80) // part 1  
// solution(input, 256) // part 2
