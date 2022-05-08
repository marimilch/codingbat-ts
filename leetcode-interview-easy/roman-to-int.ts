import { assertEquals } from "https://deno.land/std@0.138.0/testing/asserts.ts"

type romanLetters = Record<string, number>

function romanToInt(s: string): number {
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