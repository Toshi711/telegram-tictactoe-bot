import {IPlayer} from './../types'
function victoryCheck(board: number[]){

    const winMap = [123, 456, 789, 147, 258, 369, 357, 159]
  
    const moves = board.reduce((players, v, i) => {
      if(v) players[v-1] += i+1
      return players
    }, ['', ''])
  

    const winningMove: number =  <number>winMap.find(comb =>
      moves.some(m => 
        comb.toString().split('').every(c => m.includes(c))
      )
    )
 
    return board[+winningMove?.toString()[0] - 1]

}

export default victoryCheck