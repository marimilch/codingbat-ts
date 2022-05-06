import { assertEquals } from "https://deno.land/std@0.138.0/testing/asserts.ts"

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
