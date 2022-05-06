import { assertEquals } from "https://deno.land/std@0.138.0/testing/asserts.ts"

function arrayShiftFromRight(arr: Array<number>, index: number, shift: number): void
{
  for (let i = index; i < arr.length - shift; i++) {
    arr[i] = arr[i + shift]
  }

  for (let i = arr.length - shift; i < arr.length; i++) {
    arr[i] = -1
  }
}

// Should neither return new array nor change the arrays length
function removeDuplicatesFromSortedArray(arr: Array<number>): void
{
  if (arr.length < 2) return

  let lastN = arr[0]
  let currentLength = 1
  let startIndex = 0

  for (let i = 1; i < arr.length; i++) {
    const n = arr[i]
    
    // new row
    if (lastN !== n)
    {
      arrayShiftFromRight(
        arr,
        startIndex,
        currentLength - 1
      )

      i -= currentLength - 1
      currentLength = 0
      startIndex = i
    }

    lastN = n
    ++currentLength
  }
}

Deno.test('removeDuplicatesFromSortedArray', () => {
  const arr1 = [1, 1, 2]
  const arr2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
  const arr1Expected = [1, 2, -1]
  const arr2Expected = [0, 1, 2, 3, 4, -1, -1, -1, -1, -1]

  removeDuplicatesFromSortedArray(arr1)
  removeDuplicatesFromSortedArray(arr2)
  
  assertEquals(arr1, arr1Expected)
  assertEquals(arr2, arr2Expected)
})