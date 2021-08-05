const { DB } = require('../db.js')
const embed = require('../embeds.js')
const { fullDay } = require('../constants/fullDay.js')

exports.setDay = function (args, message, props) {
  let days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  let day = args[0].toLowerCase()
  if (args.length !== 1) {
    return message.channel.send(embed.errorEmbed(
      '!setDay accepts one argument.\n\n' +
      '`!setDay [mon|tue|wed|thu|fri|sat|s un]`'
    ))
  } else if (!days.includes(day)) {
    return message.channel.send(embed.errorEmbed(
      'Got `' + args[0] + '` as an argument, but it is invalid.\n\n' +
      'The argument supplied to !setDay must be one of the following `[mon|tue|wed|thu|fri|sat|sun]`.'
    ))
  }

  DB.set('dropDay', day)
  let dropAmount = DB.get('dropAmount')
  let dropFrequency = DB.get('dropFrequency')
  if (typeof dropFrequency === 'undefined' || typeof dropAmount === 'undefined') {
    props.setInitialTimer(message)
    return message.channel.send(embed.infoEmbed(
      'The drop day has been set to ' + fullDay[day] + '.\n\n' +
      'However, regular currency drops are not currently enabled.\n' +
      'To enable weekly drops use the command `!setDrop weekly amount`.\n' +
      'Or use `!help setDrop` to see more information about setting up drops.', 'Drop Day Update Success'
      ))
    } else {
    return message.channel.send(embed.infoEmbed(
      'Drops will be given out every ' + fullDay[day], 'Drop Day Update Success'
    ))
  }
}