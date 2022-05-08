import { assertEquals } from "https://deno.land/std@0.138.0/testing/asserts.ts"

type charCounts = Record<string, number>

// Does not work because replaceAll is not available
function removeDuplicatesAlt(s: string, k: number) {
  // Phase 1: Just count
  const csRaw: charCounts = {}
  for (let i = 0; i < s.length; ++i) {
    const c = s.charAt(i)
    if (!csRaw[c]) csRaw[c] = 0
    ++csRaw[c]
  }

  // Phase 2: Only keep counts > k
  const cs: charCounts = {}
  for (const c in csRaw) {
    if (csRaw[c] < k) continue

    cs[c] = csRaw[c]
  }

  // Phase 3: Replace potential duplicates
  let touched = false
  do {
    touched = false
    for (const c in cs) {
      if (cs[c] < k) continue

      let toFind = ''
      for (let i = 0; i < k; ++i) {
        toFind += c
      }
      const oldS = s
      s = s.replaceAll(toFind, '')
      touched = oldS.length !== s.length || touched
    }
  } while (touched)

  return s
}

Deno.test('removeDuplicates2', () => {
  assertEquals(removeDuplicatesAlt('abcd', 2), 'abcd')
  assertEquals(removeDuplicatesAlt('deeedbbcccbdaa', 3), 'aa')
  assertEquals(removeDuplicatesAlt('pbbcggttciiippooaais', 2), 'ps')
  assertEquals(removeDuplicatesAlt('yfttttfbbbbnnnnffbgffffgbbbbgssssgthyyyy', 4), 'ybth')
})