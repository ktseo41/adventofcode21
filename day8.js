// part 1

function countUniqueNumber(input){
  const [all, fourDigit] = input.split('|').map(v => v.trim())
  
  return fourDigit.split(' ').map(digit => digit.length).filter(v => [2, 3, 4, 7].includes(v)).length
}

function solution1(input){
  return input.split('\n').map(countUniqueNumber).reduce((a, b) => a + b)
}

// part 2

function getFourDigit(row){
  const [allNumbers, fourDigit] = row.split('|').map(v => v.trim())
  
  const twoThreeFive = allNumbers.split(' ').filter(v => v.length === 5)
  const mapTwoThreeFive = twoThreeFive.reduce((accu, curr) => {
    curr.split('').forEach(chr => {
      if(!accu.has(chr)) return accu.set(chr, 1)
      
      accu.set(chr, accu.get(chr) + 1)
    })
    
    return accu
  }, new Map())
  
  const be = [...mapTwoThreeFive.entries()].filter(([chr, count]) => count === 1).map(([chr]) => chr)
  const cf = [...mapTwoThreeFive.entries()].filter(([chr, count]) => count === 2).map(([chr]) => chr)
  const [zero] = allNumbers.split(' ').filter(v => v.length === 6).filter(v => be.concat(cf).every(chr => v.includes(chr)))
  const [nine] = allNumbers.split(' ').filter(v => v.length === 6).filter(v => v !== zero &&  cf.every(chr => v.includes(chr)))
  const [six] = allNumbers.split(' ').filter(v => v.length === 6).filter(v => v !== zero &&  be.every(chr => v.includes(chr)))
  const [eight] = allNumbers.split(' ').filter(v => v.length === 7)
  const [e] = eight.split('').filter(chr => !nine.includes(chr))
  const five = six.split('').filter(chr => chr !== e).join('')
  const twoThree = twoThreeFive.filter(v => !v.split('').every(chr => five.includes(chr)))
  const [two] = twoThreeFive.filter(v => v.split('').filter(chr => !five.includes(chr)).length === 2)
  const [three] = twoThree.filter(v => !v.split('').every(chr => two.includes(chr)))
  const [one] = allNumbers.split(' ').filter(v => v.length === 2)
  const [four] = allNumbers.split(' ').filter(v => v.length === 4)
  const [seven] = allNumbers.split(' ').filter(v => v.length === 3)
  
  // console.log([zero, one, two, three, four, five, six, seven, eight, nine])
  const found = [zero, one, two, three, four, five, six, seven, eight, nine]
  const sortedFound = found.map(_found => _found.split('').sort((a, b) => a.localeCompare(b)).join(''))
  const mapFourDigits = fourDigit.split(' ').map(digit => {
    const sortedDigit = digit.split('').sort((a, b) => a.localeCompare(b)).join('')
    const number = sortedFound.findIndex((v) => v === sortedDigit)
    return number
  })
  
  return +mapFourDigits.map(String).join('')
}

function getFourDigitSum(input){
  return input.split('\n').map(getFourDigit).reduce((a, b) => a + b)
}

solution1(input) // part 1
getFourDigitSum(input) // part 2
