exports.sortBalances = function (balances) {
  let arr = Object.entries(balances)
  arr.sort((a, b) => {
    return b[1] - a[1]
  })
  return arr
}