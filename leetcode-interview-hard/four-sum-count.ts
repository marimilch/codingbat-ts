import { assertEquals } from "https://deno.land/std@0.138.0/testing/asserts.ts"

// ------ Four Sum Count
function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
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