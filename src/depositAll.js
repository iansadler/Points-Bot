const { DB } = require('./db.js')
const embed = require('./embeds.js')

exports.depositAll = function (message, amount, currency) {
  let balance = DB.get('balance')
  message.guild.members.fetch().then((members) => {
    members.forEach(m => {
      if (!m.user.bot) {
        balance[m.user.id] = typeof balance[m.user.id] !== 'undefined'
          ? balance[m.user.id] + parseInt(amount)
          : parseInt(amount)
      }
    })

    DB.set('balance', balance)
    return message.channel.send(embed.infoEmbed(
      amount + ' ' + currency + ' have been added to each user\'s balance.',
      ':gift:'
    ))
  })
}