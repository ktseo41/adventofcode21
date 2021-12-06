function Board(boardString){
  const board = boardString.split('\n').map(line => line.match(/\d+/g).map(Number))
  
  function isHorizontalInARow(board){
    return board.some(row => row.every(v => v === 'X'))
  }
  
  function isVerticalInARow(board){
    return board.some((_, idx) => {
      return board.every(row => row[idx] === 'X')
    })
  }
  
  function isCrossInARow(board){
    return isPositiveCrossInARow(board) || isNegativeCrossInARow(board)
  }
  
  function isPositiveCrossInARow(board){
    return board.every((_, idx) => {
      return board[idx][idx] === 'X'
    })
  }
  
  function isNegativeCrossInARow(board){
    return board.every((_, idx) => {
      return board[board.length - 1 - idx][board.length - 1 - idx] === 'X'
    })
  }
  
  return {
    markDrawnNumber(number){
      const [rowIdx, cellIdx] = board.reduce((accu, curr, rowIdx) => {
        const cellIdx = curr.indexOf(number)
        
        if(cellIdx > -1) return [rowIdx, cellIdx]
        
        return accu
      }, [])
      
      if(rowIdx !== undefined) board[rowIdx][cellIdx] = 'X'
    },
    isWinner(){
      return (isHorizontalInARow(board) || isVerticalInARow(board) || isCrossInARow(board))
    },
    sumUnmarked(){
      return board.flatMap(row => row).reduce((a, b) => b !== 'X' ? a + b : a, 0)
    }
  }
}

function Game(input){
  const draws = input.slice(0, input.indexOf('\n')).split(',').map(Number)
  const boards = input.slice(input.indexOf('\n') + 2).split('\n\n').map(Board)
  let nextDraw;
  let lastWinner;
  
  return {
    _findWinnerIndex(){
      return boards.findIndex(b => b.isWinner())
    },
    _findLastIndex(){
      if(lastWinner !== undefined) return;
      
      if(boards.map(b => b.isWinner()).filter(Boolean).length === boards.length - 1){
        lastWinner = boards.findIndex(b => !b.isWinner())
      }
    },
    _winAll(){
      return boards.every(b => b.isWinner())
    },
    draw(){
      this.nextDraw = draws.shift()
      
      boards.forEach(b => b.markDrawnNumber(this.nextDraw))
    },
    start(){
      while(draws.length !== 0 && this._findWinnerIndex() === -1){
        this.draw()
      }
      
      return this.end()
    },
    reverseStart(){
      while(draws.length !== 0 && !this._winAll()){
        this._findLastIndex()
        this.draw()
      }
      
      return this.reverseEnd()
    },
    end(){
      return this.nextDraw * boards[this._findWinnerIndex()].sumUnmarked()
    },
    reverseEnd(){
      return this.nextDraw * boards[lastWinner].sumUnmarked()
    }
  }
}

const testGame = Game(input)

// testGame.start() // part 1
testGame.reverseStart() // part 2
