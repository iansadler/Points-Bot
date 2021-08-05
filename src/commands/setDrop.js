const { DB } = require('../db.js')
const embed = require('../embeds.js')
const { fullDay } = require('../constants/fullDay.js')

exports.setDrop = function (args, message, props) {
  if (args.length != 2) {
    return message.channel.send(embed.errorEmbed(
      'The command !setDrop accepts two arguments.\n\n' +
      '`!setDrop [daily | weekly | monthly] amount`'
    ))
  } else if (isNaN(args[1])) {
    return message.channel.send(embed.errorEmbed(
      'Got `' + args[1] + '` instead of an integer.\n\n' +
      'The second argument of !setDrop must be an integer.'
    ))
  }

  let title = 'Currency Drop Update Success'
  if (args[0] === 'daily') {
    props.setInitialTimer(message)
    message.channel.send(embed.infoEmbed(
      `${args[1]} ${props.currency} will be given daily at ${props.formattedTime}.\n\n` +
      'To change the time of drop use `!setTime hour:minute [am|pm]`',
      title
    ))
  } else if (args[0] === 'weekly') {
    let day = fullDay[DB.get('dropDay')]
    props.setInitialTimer(message)
    message.channel.send(embed.infoEmbed(
      `${args[1]} ${props.currency} will be given each ${day} at ${props.formattedTime}.\n\n` +
      'To change the time of drop use `!setTime hour:minute [am|pm]`\n' +
      'To change the day of drop use `!setDay [mon|tue|wed|thu|fri|sat|sun]`',
      title
    ))
  } else if (args[0] === 'monthly') {
    props.setInitialTimer(message)
    message.channel.send(embed.infoEmbed(
      `${args[1]} ${props.currency} will be given on the first day of each month at ${props.formattedTime}.`,
      title
    ))
  } else {
    return message.channel.send(embed.errorEmbed(
      'Got `' + args[0] +  '` instead of expected value.\n\n' +
      'The first argument should be `daily`, `weekly`, or `monthly`'
    ))
  }

  DB.set('dropAmount', args[1])
  DB.set('dropFrequency', args[0])
}