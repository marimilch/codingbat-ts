import { assertEquals } from "https://deno.land/std@0.138.0/testing/asserts.ts"

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