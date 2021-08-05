const embed = require('../embeds.js')

exports.help = function (args, message, props) {
  let title = ':grey_question::question::grey_question:'
  if (args.length === 1) {
    switch (args[0].toLowerCase()) {
      case 'dropinfo':
        return message.channel.send(embed.infoEmbed(
          'DropInfo shows how many ' + props.currency + ' users are given on a regular basis.\n\n' +
          'Command use is as follows: `!dropInfo`', title
        ))
        break
      case 'initdeposit':
        return message.channel.send(embed.infoEmbed(
          'InitDeposit gives a select amount of ' + props.currency + ' to all users on the server.\n\n' +
          'Command use is as follows: `!initDeposit amount`', title
        ))
        break
      case 'setcurrencyname':
        return message.channel.send(embed.infoEmbed(
          'SetCurrencyName changes the name of the currency for the server.\n' +
          'The current currency name is `' + props.currency + '`\n\n' +
          'Command use is as follows: `!setCurrencyName name`', title
        ))
        break
      case 'setday':
        return message.channel.send(embed.infoEmbed(
          'SetDay is used to define what day of the week drops will happen.\n\n' +
          'Command use is as follows: `!setDay [mon|tue|wed|thu|fri|sat|sun]`\n' +
          'For example, `!setDay sat`', title
        ))
        break
      case 'setdrop':
        return message.channel.send(embed.infoEmbed(
          'SetDrop enables regular currency drops for all users.\n' +
          'SetDrop\'s arguments specify how often and how many ' + props.currency + ' will be given.\n\n' +
          'Command use is as follows: `!setDrop [daily | weekly | monthly] amount`\n' +
          'For example: `!setDrop weekly 200`', title
        ))
        break
      case 'settime':
        break
      case 'standings':
        return message.channel.send(embed.infoEmbed(
          'Standings lists the top ten users with the most ' + props.currency +
          ' + the rank of the person who used the command.\n\n' +
          'Command use is as follows: `!standings`', title
        ))
        break
      case 'transfer':
        return message.channel.send(embed.infoEmbed(
          'Transfer moves ' + props.currency + ' from the users balance to another specified user\'s balance.\n\n' +
          'Command use is as follows: `!transfer amount receivingUser`', title
        ))
        break
      default:
        return message.channel.send(embed.errorEmbed(
          'Recieved `' + args[0] + '` as an argument, but it is not a valid bot command.\n\n' +
          'Use `!help` to see a list of valid commands.\n'
        ))
    }
  }

  return message.channel.send(embed.infoEmbed(
    'Use `!help commandName` for information on a specific command.\n\n' +
    '**Commands**\n' +
    'TEST POST DONT UPVOTE\n' +
    'dropInfo\n' +
    'initDeposit\n' +
    'setCurrencyName\n' +
    'setDay\n' +
    'setDrop\n' +
    'setTime\n' +
    'standings\n' +
    'transfer', title
  ))
}