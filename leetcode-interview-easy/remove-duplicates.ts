import { assertEquals } from "https://deno.land/std@0.138.0/testing/asserts.ts"

// Should neither return new array nor change the arrays length
function removeDuplicates(arr: Array<number>): Array<number> {
  if (arr.length < 2) return arr

  let j = 0 // what to write at this index (slow runner)
  for (let i = 1; i < arr.length; ++i) {
    if (arr[i] !== arr[j]) {
      ++j
      arr[j] = arr[i]
    }
  }

  arr.length = j + 1

  return arr
}

Deno.test('removeDuplicates', () => {
  const arr0 = [1, 1]
  const arr1 = [1, 1, 2]
  const arr2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]

  assertEquals(removeDuplicates(arr0), [1])
  assertEquals(removeDuplicates(arr1), [1, 2])
  assertEquals(removeDuplicates(arr2), [0, 1, 2, 3, 4])
})