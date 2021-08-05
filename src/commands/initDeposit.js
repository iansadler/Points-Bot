const embed = require('../embeds.js')
const { depositAll } = require('../depositAll.js')

exports.initDeposit = function (args, message, props) {
  if (args.length !== 1) {
    return message.channel.send(embed.errorEmbed(
      '!initDeposit accepts one argument.\n\n' +
      '`!initDeposit amount`'
    ))
  } else if (isNaN(args[0])) {
    return message.channel.send(embed.errorEmbed(
      'Got `' + args[0] + '` instead of an integer.\n\n' +
      'The argument supplied to !initDeposit must be an integer.'
    ))
  }

  depositAll(message, args[0], props.currency)
}