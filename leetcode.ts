import { assertEquals } from "https://deno.land/std@0.138.0/testing/asserts.ts"

type romanLetters = Record<string, number>

console.log("\n romanToInt")
function romanToInt(s: string): number 
{
  const singleLetters: romanLetters = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  }

  const doubleLetters: romanLetters = {
    IV: 4,
    IX: 9,
    XL: 40,
    XC: 90,
    CD: 400,
    CM: 900,
  }

  let result = 0

  let lastC = ''
  for (const c of s.split('')) {
    if (doubleLetters[lastC + c]) {
      result = result - singleLetters[lastC] + doubleLetters[lastC + c]
    } else {
      result += singleLetters[c]
    }
    lastC = c
  }

  return result
}

Deno.test('romanToInt', () => {
  assertEquals(3, romanToInt('III'))
  assertEquals(58, romanToInt('LVIII'))
  assertEquals(1994, romanToInt('MCMXCIV'))
})

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

type charCounts = Record<string, number>

function removeDuplicates2(s: string, k: number){
  // Phase 1: Just count
  const csRaw: charCounts = {}
  for (let i = 0; i < s.length; ++i){
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
  assertEquals(removeDuplicates2('abcd', 2), 'abcd')
  assertEquals(removeDuplicates2('deeedbbcccbdaa', 3), 'aa')
  assertEquals(removeDuplicates2('pbbcggttciiippooaais', 2), 'ps')
  assertEquals(removeDuplicates2('yfttttfbbbbnnnnffbgffffgbbbbgssssgthyyyy', 4), 'ybth')
})