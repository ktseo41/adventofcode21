function calculateBoth(commands){
  return commands.split('\n').map(v => v.split(' ')).reduce(([forward, depth], curr) => {
    if(curr[0] === 'forward'){
      return [forward + +curr[1], depth]
    }
    
    if(curr[0] === 'up') {
      return [forward, depth - +curr[1]]
    }
    
    return [forward, depth + +curr[1]]
  }, [0, 0])
}

calculateBoth(commands)

function calculateBothWithAim(commands){
  return commands.split('\n').map(v => v.split(' ')).reduce(([forward, depth, aim], curr) => {
    if(curr[0] === 'forward'){
      return [forward + +curr[1], depth + aim * +curr[1], aim]
    }
    
    if(curr[0] === 'up') {
      return [forward, depth, aim - +curr[1]]
    }
    
    return [forward, depth, aim + +curr[1]]
  }, [0, 0, 0])
}

calculateBothWithAim(commands)