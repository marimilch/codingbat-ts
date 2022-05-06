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