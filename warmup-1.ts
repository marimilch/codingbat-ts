console.log("\n space before \\n is on purpose")
console.log("\n actual expected")

console.log("\n sleepIn")
function sleepIn(weekday: boolean, vacation: boolean): boolean
{
  return !weekday || vacation
}

console.log(sleepIn(false, false), true)
console.log(sleepIn(true, false), false)
console.log(sleepIn(false, true), true)

console.log("\n monkeyTrouble")
function monkeyTrouble(a: boolean, b: boolean): boolean
{
  return a === b
}

console.log(monkeyTrouble(true, true), true)
console.log(monkeyTrouble(false, false), true)
console.log(monkeyTrouble(true, false), false)

console.log("\n doubleSum")

function sumDouble(a: number, b:number): number
{
  if (a===b) return 2 * (a+b)
  return a+b
}

console.log(sumDouble(1, 2), 3)
console.log(sumDouble(3, 2), 5)
console.log(sumDouble(2, 2), 8)

console.log("\n diff21")

function diff21(n: number): number {
  if (n > 21) return (n - 21) * 2
  return 21 - n
}

console.log(diff21(19), 2)
console.log(diff21(10), 11)
console.log(diff21(21), 0)
