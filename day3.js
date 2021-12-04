function countBit(input){
  return input.split('\n').reduce((accu, curr, index) => {
    const asdf = curr.split('')
    
    asdf.forEach((zoo, index) => {
      
      if(!accu[index]) accu[index] = {}
      
      if(accu[index]?.[zoo]){
        return accu[index].[zoo] += 1
      }
      
      accu[index].[zoo] = 1
    })
    
    return accu
  }, [])
}

function calculateGammaEpsilon(counts){
  const gammaRate = counts.map((count) => count['0'] > count['1'] ? 0 : 1 )
  const epsilonRate = counts.map((count) =>  count['0'] < count['1'] ? 0 : 1 )
  
  return calculateBinary(gammaRate) * calculateBinary(epsilonRate)
}

function calculateBinary(binaryArray){
  return binaryArray.reverse().map((value, index) => {
    return Math.pow(2, index) * value
  }).reduce((a, b) => a + b)
}

const count = countBit(test)

calculateGammaEpsilon(count)

// ------------------------------

function countSpecificIndex(input, sIndex){
  return input.reduce((accu, curr) => {
    const currBit = curr[sIndex]
    
    
    if(accu[currBit]){
      accu[currBit] += 1
      return accu
    }
    
    accu[currBit] = 1
    
    return accu
    
  }, [])
}

let countCallback = 0;
let countCallback2 = 0;

function findOxygenRate(input, sIndex = 0){
  const [zeroCount = 0, oneCount = 0] = countSpecificIndex(input, sIndex)

  if(input.length === 1){
    return input[0]
  }
  
  if (zeroCount === oneCount){
    return findOxygenRate(input.filter(v => v[sIndex] === '1'), sIndex + 1)
  }
  
  if (zeroCount > oneCount){
    return findOxygenRate(input.filter(v => v[sIndex] === '0'), sIndex + 1)
  }
  
  return findOxygenRate(input.filter(v => v[sIndex] === '1'), sIndex + 1)
}

function findCO2Rate(input, sIndex = 0){
  const [zeroCount = 0, oneCount = 0] = countSpecificIndex(input, sIndex)
  
  if(input.length === 1){
    return input[0]
  }
  
  if (zeroCount === oneCount){
    return findCO2Rate(input.filter(v => v[sIndex] === '0'), sIndex + 1)
  }
  
  if (zeroCount > oneCount){
    return findCO2Rate(input.filter(v => v[sIndex] === '1'), sIndex + 1)
  }
  
  return findCO2Rate(input.filter(v => v[sIndex] === '0'), sIndex + 1)
}

function calculateBinaryFromString(binaryString){
  return calculateBinary(binaryString.split(''))
}

function getLifeSupportRating(input){
  return calculateBinaryFromString(findOxygenRate(input.split('\n'))) * calculateBinaryFromString(findCO2Rate(input.split('\n')))
}

getLifeSupportRating(test)

// ------------------------------
