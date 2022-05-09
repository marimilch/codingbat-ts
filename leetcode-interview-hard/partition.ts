import { assertEquals } from "https://deno.land/std@0.138.0/testing/asserts.ts"

function isPalindromePartition(partition: string[]): boolean
{
  for (let j = 0; j < partition.length; j++) {
    const pPartial = partition[j]
    if (!isPalindrome(pPartial)) return false
  }
  
  return true
}

function isPalindrome(s: string): boolean
{
  let i = 0
  let j = s.length - 1
  while (i <= j) {
    if (s.charAt(i) !== s.charAt(j)) return false
    ++i
    --j
  }

  return true
}

function partitionOnly(s: string): string[][] 
{
  // Find every possible partition
  if (s.length === 0) return [[]]

  if (s.length === 1) return [[s]]

  const ps = partitionOnly(s.substring(1, s.length))

  const psLengthStart = ps.length
  for (let i = 0; i < psLengthStart; i++) {
    const c = s.charAt(0)

    // add as glued on letter
    if (ps[i][0]) {
      // clone
      const toPush = JSON.parse(JSON.stringify(ps[i]))
      toPush[0] = c + toPush[0]
      ps.push(toPush)
    }
    
    // add as separate letter
    ps[i] = [c, ...ps[i]]
  }

  return ps
}

function partition(s: string): string[][]
{
  return partitionOnly(s).filter(isPalindromePartition)
}

console.log(partition("efe"))

Deno.test('partition', () => {
  assertEquals(partition("aab"), [["a", "a", "b"], ["aa", "b"]])
  assertEquals(partition("cdd"), [["c", "d", "d"], ["c", "dd"]])
  assertEquals(partition("efe"), [["e", "f", "e"], ["efe"]])
  assertEquals(partition("a"), [["a"]])
})