import { assertEquals } from "https://deno.land/std@0.138.0/testing/asserts.ts"

// ------ Product Except Self ( O(n) )
function productExceptSelf(nums: number[]): number[] {
  if (nums.length == 0) return nums
  if (nums.length == 1) return [1]

  // left side first
  const resultLeft = [1]
  resultLeft.length = nums.length
  for (let i = 1; i < nums.length; i++) {
    // i points to ith result
    // j points to last left factor for ith result
    const j = i - 1
    resultLeft[i] = resultLeft[i - 1] * nums[j]
  }

  const resultRight = [...nums]
  resultRight[nums.length - 1] = 1
  resultRight.length = nums.length
  for (let i = 1; i < nums.length; i++) {
    const k = nums.length - 1 - i
    // k points to kth result
    // j points to last right factor for kth result
    const j = k + 1
    resultRight[k] = resultRight[k + 1] * nums[j]
  }

  const result: Array<number> = []
  result.length = nums.length
  for (let i = 0; i < nums.length; i++) {
    result[i] = resultLeft[i] * resultRight[i]
  }

  return result
}

Deno.test('productExceptSelf', () => {
  assertEquals(productExceptSelf([1, 2, 3, 4]), [24, 12, 8, 6])
  assertEquals(productExceptSelf([-1, 1, 0, -3, 3]), [0, 0, 9, 0, 0])
})

type Coordinate = {
  x: number,
  y: number,
}

type Rect = {
  xStart: number,
  yStart: number,
  xEnd: number,
  yEnd: number,
}

type SpiralPath = {
  coord: Coordinate,
  dir: string,
  rect: Rect,
}

// ------ Spiral Order Matrix
function spiralOrder(matrix: number[][]): number[] {
  const getVal = (m: number[][], x: number, y: number) => m[y][x]
  const getNextCoord = (spiralPath: SpiralPath): SpiralPath => {
    // "Wall" handling
    if (spiralPath.dir === 'r' && spiralPath.coord.x >= spiralPath.rect.xEnd) {
      spiralPath.dir = 'd'
      spiralPath.coord.y += 1
      spiralPath.rect.yStart += 1
      return spiralPath
    }

    if (spiralPath.dir === 'd' && spiralPath.coord.y >= spiralPath.rect.yEnd) {
      spiralPath.dir = 'l'
      spiralPath.coord.x -= 1
      spiralPath.rect.xEnd -= 1
      return spiralPath
    }

    if (spiralPath.dir === 'l' && spiralPath.coord.x <= spiralPath.rect.xStart) {
      spiralPath.dir = 'u'
      spiralPath.coord.y -= 1
      spiralPath.rect.yEnd -= 1
      return spiralPath
    }

    if (spiralPath.dir === 'u' && spiralPath.coord.y <= spiralPath.rect.yStart) {
      spiralPath.dir = 'r'
      spiralPath.coord.x += 1
      spiralPath.rect.xStart += 1
      return spiralPath
    }

    // No "walls" -> keep walking
    if (spiralPath.dir === 'r') {
      spiralPath.coord.x += 1
    }
    if (spiralPath.dir === 'd') {
      spiralPath.coord.y += 1
    }
    if (spiralPath.dir === 'l') {
      spiralPath.coord.x -= 1
    }
    if (spiralPath.dir === 'u') {
      spiralPath.coord.y -= 1
    }

    return spiralPath
  }

  const x = matrix[0].length
  const y = matrix.length
  const spiralPath: SpiralPath = {
    coord: {
      x: 0,
      y: 0,
    },
    dir: 'r',
    rect: {
      xStart: 0,
      yStart: 0,
      xEnd: x - 1,
      yEnd: y - 1,
    }
  }

  const result: number[] = []

  for(let i = 0; i < x * y; ++i){
    // direction change needed?
    result.push(getVal(matrix, spiralPath.coord.x, spiralPath.coord.y))
    getNextCoord(spiralPath)
  }

  return result
}

Deno.test('spiralOrder', () => {
  assertEquals(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]), [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7])
  assertEquals(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [1, 2, 3, 6, 9, 8, 7, 4, 5])
  assertEquals(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]), [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10])
})

// ------ Four Sum Count
function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number 
{
  let tupleCount = 0

  for (const n1 of nums1) {
    for (const n2 of nums2) {
      for (const n3 of nums3) {
        for (const n4 of nums4) {
          if (n1 + n2 + n3 + n4 === 0) {
            ++tupleCount
          }
        }
      }
    }
  }

  return tupleCount
}

Deno.test('fourSumCount', () => {
  assertEquals(fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2]), 2)
  assertEquals(fourSumCount([0], [0], [0], [0]), 1)
})

// ------ Max Area between two heights
function maxArea(heights: number[]): number {
  if (heights.length < 2) return 0

  let largestArea = 0
  for (let i = 0; i < heights.length; i++) {
    const height1 = heights[i]
    
    for (let j = i + 1; j < heights.length; j++) {
      const height2 = heights[j]
      const smallerHeight = Math.min(height1, height2)
      const currentArea = smallerHeight * (j - i)

      if (currentArea > largestArea) {
        largestArea = currentArea
      }
    }
  }

  return largestArea
}

Deno.test('maxArea', () => {
  assertEquals(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49)
  assertEquals(maxArea([1, 1]), 1)
})

// ------ Game Of Life
/**
 Do not return anything, modify board in-place instead.
 */

class GameOfLife {
  private width: number
  private height: number
  board: number[][]

  public constructor(board: number[][])
  {
    if (board.length < 1) throw new Error('Board height needs to be > 0')
    if (board[0].length < 1) throw new Error('Board width needs to be > 0')
    // @todo verify consistency of board size

    this.height = board.length
    this.width = board[0].length
    this.board = board
  }
  public nextGeneration(): number[][]
  {
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
  private outOfBounds(x: number, y: number): boolean 
  {
    return (x < 0 || y < 0 || x >= this.width || y >= this.height)
  }
  private setVal(x: number, y: number, v: number): number
  {
    return this.board[y][x] = v
  }
  private getVal(x: number, y: number): number
  {
    return this.board[y][x]
  }
  getCurrentVal(x: number, y: number): number 
  {
    if ( this.outOfBounds(x, y) ) {
      return 0
    }
    return (this.getVal(x,y) & 1)
  } 
  getFutureVal(x: number, y: number): number 
  {
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
