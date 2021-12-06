function getDirectionAndPower(row){
  return row.split('->').map(v => v.trim()).map(v => v.split(',').map(Number)).reduce((accu, curr) => {
    const [nextX, nextY] = curr;
    const [currX, currY] = accu;
    
    // if(nextX === currX || nextY === currY) // uncomment part 1
      return [nextX - currX, nextY - currY]
    
    return false
  })
}

function getStartPoint(row){
  return row.split('->').map(v => v.trim())[0].split(',').map(Number)
}

function findBiggest(input){
  return Math.max(...input.match(/\d+/g).map(Number))
}

function takeSteps(directionAndPower, startPoint, map){
  
  if(!directionAndPower) return
  
  const [xDP, yDP] = directionAndPower
  const [xD, yD] = [xDP === 0 ? 0 : xDP > 0 ? 1 : -1, yDP === 0 ? 0 : yDP > 0 ? 1 : -1]
  const power = Math.max(...directionAndPower.map(Math.abs)) + 1
  
  new Array(power).fill().forEach((_, count) => {
    const [startX, startY] = startPoint
    
    const targetX = startX + xD * count
    const targetY = startY + yD * count
    
    markOnPoint(targetX, targetY, map)
  })
}

function markOnPoint(x, y, map){
  if (map[y][x] === '.'){
    map[y][x] = 1
    return
  }
  
  map[y][x] += 1
}

function findUnsafeWay(input){
  const biggestNum = findBiggest(input)
  const map = new Array(biggestNum + 1).fill().map(_ => new Array(biggestNum + 1).fill('.'))
  const ventInfos = input.split('\n').map(v => [getDirectionAndPower(v), getStartPoint(v)])
  
  ventInfos.forEach(vI => {
    const [directionAndPower, startPoint] = vI
    takeSteps(directionAndPower, startPoint, map)
  })
  
  return map.flatMap(row => row).filter(Number).filter(v => v >= 2)
}

findUnsafeWay(input).length
