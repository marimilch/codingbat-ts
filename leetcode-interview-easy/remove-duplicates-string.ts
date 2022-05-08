import { assertEquals } from "https://deno.land/std@0.138.0/testing/asserts.ts"

function removeDuplicates(s: string, k: number): string {
  let touched = false
  // const sSplit = s.split('')

  do {
    if (s.length < k) return s

    touched = false
    let lastC = ''
    let currentLen = 0
    let startIndex = 0

    for (let ci = 0; ci <= s.length; ++ci) {
      const c = s.charAt(ci) // ok if undefined

      // Remove letter chain if equal to k and restart counting
      if (currentLen === k) {
        touched = true
        s = s.substring(0, startIndex) + s.substring(startIndex + currentLen)
        ci -= k
        startIndex = ci
        currentLen = 0
      }

      // New letter chain
      if (lastC !== c) {
        startIndex = ci
        currentLen = 1
        lastC = c
      } else {
        currentLen++
      }
    }
  } while (touched)


  return s
}

Deno.test('removeDuplicates', () => {
  assertEquals(removeDuplicates('abcd', 2), 'abcd')
  assertEquals(removeDuplicates('deeedbbcccbdaa', 3), 'aa')
  assertEquals(removeDuplicates('pbbcggttciiippooaais', 2), 'ps')
  assertEquals(removeDuplicates('yfttttfbbbbnnnnffbgffffgbbbbgssssgthyyyy', 4), 'ybth')
})