function countIncrease(string){
  return string.split('\n').map(Number).reduce((accu, _, index, arr) => {
    if(getThreeSumOfArrayOfIndex(arr, index) < getThreeSumOfArrayOfIndex(arr, index + 1)){
      return accu + 1
    }
    
    return accu
  }, 0)
}

countIncrease(grounds)

function getThreeSumOfArrayOfIndex(arr, index){
  return arr.slice(index, index + 3).reduce((a, c) => a + c, 0)
}