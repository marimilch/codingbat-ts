import { assertEquals } from "https://deno.land/std@0.138.0/testing/asserts.ts"

// ------ Game Of Life
/**
 Do not return anything, modify board in-place instead.
 */

class GameOfLife {
  private width: number
  private height: number
  board: number[][]

  public constructor(board: number[][]) {
    if (board.length < 1) throw new Error('Board height needs to be > 0')
    if (board[0].length < 1) throw new Error('Board width needs to be > 0')
    // @todo verify consistency of board size

    this.height = board.length
    this.width = board[0].length
    this.board = board
  }
  public nextGeneration(): number[][] {
    // the smaller number represents the current state
    // the larger one the future state
    console.log('neighbours')
    for (let j = 0; j < this.height; j++) {
      const row: number[] = []
      for (let i = 0; i < this.width; i++) {
        const neighbourCount = this.countNeighbours(i, j)

        row.push(neighbourCount)

        if ((neighbourCount === 2 || neighbourCount === 3) && this.getCurrentVal(i, j) === 1) {
          this.markFutureVal(i, j)
          continue
        }

        if (neighbourCount === 3 && this.getCurrentVal(i, j) === 0) {
          this.markFutureVal(i, j)
          continue
        }
      }
      console.log(row)
    }

    // Make next generation current generation
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        this.setVal(i, j, this.getFutureVal(i, j))
      }
    }

    return this.board
  }
  private outOfBounds(x: number, y: number): boolean {
    return (x < 0 || y < 0 || x >= this.width || y >= this.height)
  }
  private setVal(x: number, y: number, v: number): number {
    return this.board[y][x] = v
  }
  private getVal(x: number, y: number): number {
    return this.board[y][x]
  }
  getCurrentVal(x: number, y: number): number {
    if (this.outOfBounds(x, y)) {
      return 0
    }
    return (this.getVal(x, y) & 1)
  }
  getFutureVal(x: number, y: number): number {
    if (this.outOfBounds(x, y)) {
      return 0
    }
    return (this.getVal(x, y) & 2) >>> 1
  }
  markFutureVal(x: number, y: number): void {
    this.board[y][x] |= 2
  }
  countNeighbours(x: number, y: number): number {
    // i points to the x coordinate
    // j points to the y coordinate
    let result = 0
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i === 0 && j === 0) {
          continue
        }


        if (this.getCurrentVal(x + i, y + j) === 1) {
          result++
        }
      }
    }

    return result
  }
}

function gameOfLife(board: number[][]): number[][] {
  const gameOfLifeInstance = new GameOfLife(board)

  return gameOfLifeInstance.nextGeneration()
}

Deno.test('gameOfLife', () => {
  assertEquals(gameOfLife([[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]]), [[0, 0, 0], [1, 0, 1], [0, 1, 1], [0, 1, 0]])
  assertEquals(gameOfLife([[1, 1], [1, 0]]), [[1, 1], [1, 1]])
})