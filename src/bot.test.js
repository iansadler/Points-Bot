const { getMillisecondsToFirstDrop } = require('./getMillisecondsToFirstDrop.js')
const { sortBalances } = require('./utils/sortBalances.js')

test('SortBalances takes the balances object and returns it as a an array of arrays, sorted by balance size.', () => {
  expect(sortBalances({
    'Abe': 212,
    'Bell': 230,
    'Chance': 124,
    'Daniel': 298,
    'Erica': 358,
    'Francois': 239,
    'Gina': 302,
    'Hugo': 248,
    'Isadora': 291,
    'Jenny': 265,
    'Khalid': 224,
    'Linus': 204,
    'Matthew': 327,
  })).toStrictEqual([
    ['Erica', 358],
    ['Matthew', 327],
    ['Gina', 302],
    ['Daniel', 298],
    ['Isadora', 291],
    ['Jenny', 265],
    ['Hugo', 248],
    ['Francois', 239],
    ['Bell', 230],
    ['Khalid', 224],
    ['Abe', 212],
    ['Linus', 204],
    ['Chance', 124]
  ])
})

// DAILY DROP TESTS
// Get time in MS between 4:00pm and 5:00pm
let i1 = [[5, 0, 'pm'], new Date(2021, 3, 1, 16), 'daily']
let r1 = 60 * 60 * 1000
test('getMillisecondsToFirstDrop ==> Get time in MS between 4:00pm and 5:00pm', () => {
  expect(getMillisecondsToFirstDrop(...i1)).toBe(r1)
})
// Get time in MS between 5:00pm and 4:00am
let i2 = [[4, 0, 'am'], new Date(2021, 3, 1, 17), 'daily']
let r2 =  11 * 60 * 60 * 1000
test('getMillisecondsToFirstDrop ==> Get time in MS between 5:00pm and 4:00am', () => {
  expect(getMillisecondsToFirstDrop(...i2)).toBe(r2)
})
// Get time in MS between 3:23am and 12:42pm
let i3 = [[12, 42, 'pm'], new Date(2021, 3, 1, 3, 23), 'daily']
let r3 = (9 * 60 + 19) * 60 * 1000
test('getMillisecondsToFirstDrop ==> Get time in MS between 3:23am and 12:42pm', () => {
  expect(getMillisecondsToFirstDrop(...i3)).toBe(r3)
})
// Get time in MS between 5:50pm and 5:50pm
let i4 = [[5, 50, 'pm'], new Date(2021, 3, 1, 17, 50), 'daily']
let r4 = 0
test('getMillisecondsToFirstDrop ==> Get time in MS between 5:50pm and 5:50pm', () => {
  expect(getMillisecondsToFirstDrop(...i4)).toBe(r4)
})
// Get time in MS between 6:20:32am and 6:20am
let i5 = [[6, 20, 'am'], new Date(2021, 3, 1, 6, 20, 32), 'daily']
let r5 = (24 * 60 * 60 - 32) * 1000
test('getMillisecondsToFirstDrop ==> Get time in MS between 6:20:32am and 6:20am', () => {
  expect(getMillisecondsToFirstDrop(...i5)).toBe(r5)
})

// WEEKLY DROP TESTS
// Get time in MS between friday 9:30pm and saturday 8:00am
let i6 = [[8, 0, 'am'], new Date(2021, 3, 2, 21, 30), 'weekly', 'sat']
let r6 = (10 * 60 + 30) * 60 * 1000
test('getMillisecondsToFirstDrop ==> Get time in MS between friday 9:30pm and saturday 8:00am', () => {
  expect(getMillisecondsToFirstDrop(...i6)).toBe(r6)
})

// Get time in MS between monday 9:30am and monday 12:20pm
let i7 = [[12, 20, 'pm'], new Date(2021, 3, 5, 9, 30), 'weekly', 'mon']
let r7 = (2 * 60 + 50) * 60 * 1000
test('getMillisecondsToFirstDrop ==> Get time in MS between monday 9:30am and monday 12:20pm', () => {
  expect(getMillisecondsToFirstDrop(...i7)).toBe(r7)
})

// Get time in MS between thursday 9:30pm and thursday 9:31pm
let i8 = [[9, 31, 'pm'], new Date(2021, 3, 1, 21, 30), 'weekly', 'thu']
let r8 = 60000
test('getMillisecondsToFirstDrop ==> Get time in MS between thursday 9:30pm and thursday 9:31pm', () => {
  expect(getMillisecondsToFirstDrop(...i8)).toBe(r8)
})

// Get time in MS between thursday 9:30pm and thursday 9:30pm
let i9 = [[9, 30, 'pm'], new Date(2021, 3, 1, 21, 30), 'weekly', 'thu']
let r9 = 0
test('getMillisecondsToFirstDrop ==> Get time in MS between thursday 9:30pm and thursday 9:30pm', () => {
  expect(getMillisecondsToFirstDrop(...i9)).toBe(r9)
})

// Get time in MS between sunday 6:00am and sunday 4:00am
let i10 = [[4, 0, 'am'], new Date(2021, 3, 4, 6, 0), 'weekly', 'sun']
let r10 = ((6 * 24) + 4 + 18) * 60 * 60 * 1000
test('getMillisecondsToFirstDrop ==> Get time in MS between sunday 6:00am and sunday 4:00am', () => {
  expect(getMillisecondsToFirstDrop(...i10)).toBe(r10)
})

// Get time in MS between monday 5:50:45am and monday 5:50am
let i11 = [[5, 50, 'am'], new Date(2021, 3, 5, 5, 50, 45), 'weekly', 'mon']
let r11 = 7 * 24 * 60 * 60 * 1000 - 45000
test('getMillisecondsToFirstDrop ==> Get time in MS between monday 5:50:45am and monday 5:50am', () => {
  expect(getMillisecondsToFirstDrop(...i11)).toBe(r11)
})

// Get time in MS between monday 5:50:00:999am and monday 5:50am
let i12 = [[5, 50, 'am'], new Date(2021, 3, 5, 5, 50, 0, 999), 'weekly', 'mon']
let r12 = 7 * 24 * 60 * 60 * 1000 - 999
test('getMillisecondsToFirstDrop ==> Get time in MS between monday 5:50:00:999am and monday 5:50am', () => {
  expect(getMillisecondsToFirstDrop(...i12)).toBe(r12)
})

// MONTHLY DROP TESTS
// Get time in MS between 2:20am April 5, 2021 and 2:00am May 1, 2021.
let i13 = [[2, 0, 'am'], new Date(2021, 3, 5, 2, 20), 'monthly']
let r13 =  (26 * 24 * 60 - 20) * 60 * 1000
test('getMillisecondsToFirstDrop ==> Get time in MS between 2:20am April 5th 2021, and 2:00am May 1st 2021.', () => {
  expect(getMillisecondsToFirstDrop(...i13)).toBe(r13)
})

// Get time in MS between 7:00pm April 1, 2021 and 11:00pm April 1, 2021
let i14 = [[11, 0, 'pm'], new Date(2021, 3, 1, 19, 0), 'monthly']
let r14 = 4 * 60 * 60 * 1000
test('getMillisecondsToFirstDrop ==> Get time in MS between 7:00pm April 1st, 2021 and 11:00pm April 1st 2021.', () => {
  expect(getMillisecondsToFirstDrop(...i14)).toBe(r14)
})

// Get time in MS between 4:45:12:50pm February 18, 2021 and 1:00am March 1, 2021
let i15 = [[1, 0, 'am'], new Date(2021, 1, 18, 16, 45, 12, 50), 'monthly']
let r15 = (((10 * 24 + 1 + 7) * 60 + 14) * 60 + 47) * 1000 + 950
test('getMillisecondsToFirstDrop ==> Get time in MS between 4:45:12:50pm February 18, 2021 and 1:00am March 1, 2021.', () => {
  expect(getMillisecondsToFirstDrop(...i15)).toBe(r15)
})