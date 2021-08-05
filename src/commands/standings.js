const { DB } = require('../db.js')
const { sortBalances } = require('../utils/sortBalances.js')

exports.standings = function (args, message, props) {
  let balances = sortBalances(DB.get('balance'))
  if (Object.keys(balances).length === 0) return message.channel.send(
    '```ml\n' + '(*Leaderboard*)\n' +
    'Currently nobody has any ' + props.currency + '.\n\n' +
    '- See \'!help\' for information on how to give users ' + props.currency + '.```'
  )

  balances.forEach((a, i) => {
    balances[i][0] = message.guild.members.cache.get(a[0]).user.username
  })

  // Find the max length username
  let max = balances.reduce((a, b) => {
    return (a[0].length >= b[0].length) ? a : b
  })[0].length + 1

  let str = ''
  let pad = ' '.repeat(max)

  balances.forEach((b, i) => {
    if (i < 10) {
      str += (i + 1)
      str += (i < 9) ? ')  ' : ') '
      str += (b[0] + pad).substring(0, max)
      str += b[1] + '\n'
    } else if (b[0] === message.author.username) {
      str += '(*' + '-'.repeat(max + 4) + '*)\n'
      str += (i + 1)
      str += (i < 9) ? ')  ' : ') '
      str += (b[0] + pad).substring(0, max)
      str += b[1]
    }
  })

  message.channel.send(
    '```ml\n' + '(*Leaderboard*)\n' + str + '```'
  )
}