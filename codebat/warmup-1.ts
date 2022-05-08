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

console.log("\n icyHot")

function icyHot(temp1: number, temp2: number): boolean {
  if (temp1 > 100 && temp2 < 0) return true
  if (temp2 > 100 && temp1 < 0) return true

  return false
}

console.log(icyHot(120, -1), true)
console.log(icyHot(-1, 120), true)
console.log(icyHot(2, 120), false)

console.log("\n lastDigit")

function lastDigit(a: number, b: number): boolean {
  return a % 10 === b % 10
}

console.log(lastDigit(7, 17), true)
console.log(lastDigit(6, 17), false)
console.log(lastDigit(3, 113), true)

console.log("\n endUp")

// Note: end index of substring excludes itself 
function endUp(str: string): string {
  return (
    str.substring(0, str.length - 3) 
    + str.substring(str.length - 3, str.length).toLocaleUpperCase()
  )
}

console.log(endUp("Hello"), "HeLLO")
console.log(endUp("hi there"), "hi thERE")
console.log(endUp("hi"), "HI")

console.log("\n everyNth")

function everyNth(str: string, n: number): string {
  return str.split('').reduce( (accStr, c, i) => {
    if (i % n === 0) return accStr + c
    return accStr
  })
}

console.log(everyNth("Miracle", 2), "Mrce")
console.log(everyNth("abcdefg", 2), "aceg")
console.log(everyNth("abcdefg", 3), "adg")

