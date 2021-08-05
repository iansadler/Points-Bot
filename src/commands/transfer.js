const { DB } = require('../db.js')
const embed = require('../embeds.js')

exports.transfer = function (args, message, props) {
  if (args.length === 1) {
    return message.channel.send(embed.errorEmbed(
      '!transfer accepts two arguments.\n\n' +
      '`!transfer amount username`'
    ))
  } else if (isNaN(args[0])) {
    return message.channel.send(embed.errorEmbed(
      'Got `' + args[0] + '` instead of an integer.\n\n' +
      'The second argument of !transfer must be an integer.'
    ))
  } else if (args[0] <= 0) {
    return message.channel.send(embed.errorEmbed(
      '`' + args[0] + '` is an invalid transfer amount.'
    ))
  }

  let receiverId = ''
  let amount = args[0]
  args.shift()
  let name = args.reduce((a,b) => a + ' ' + b)
  if (name === message.author.username) {
    return message.channel.send(embed.infoEmbed(
      'You are trying to transfer ' + props.currency + ' to yourself.',
      'You good fam?'
    ))
  }

  message.guild.members.fetch().then((members) => {
    members.forEach(m => {
      if (m.user.username === name) {
        receiverId = m.user.id
      }
    })

    if (receiverId === '') return message.channel.send(embed.errorEmbed(
      'The user `' + name + '` was not found.'
    ))

    let senderBalance = DB.get('balance', message.author.id)
    if (typeof senderBalance === 'undefined') {
      senderBalance = 0
    }
    if (senderBalance < amount) return message.channel.send(embed.errorEmbed(
      'User does not have enough ' + props.currency + ' to complete transfer.\n'
    ))

    // Lower sender's balance
    senderBalance -= amount
    DB.set('balance', parseInt(senderBalance), message.author.id)

    // Increase receiver's balance
    let receiverBalance = DB.get('balance', receiverId) + parseInt(amount)
    DB.set('balance', receiverBalance, receiverId)

    return message.channel.send(embed.infoEmbed(
      message.author.username + ' has transferred ' +
      amount + ' ' + props.currency + ' to ' + name + '.\n\n' +
      message.author.username + '\'s new balance: ```ml\n' +
      senderBalance + '```\n' +
      name + '\'s new balance: ```ml\n' + receiverBalance + '```',
      'Transfer Success'
    ))
  })
}