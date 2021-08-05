const { DB } = require('../db.js')
const embed = require('../embeds.js')
const { fullDay } = require('../constants/fullDay.js')

exports.setTime = function (args, message, props) {
  if (args.length !== 2) {
    return message.channel.send(embed.errorEmbed(
      '!setTime accepts two arguments.\n\n' +
      '`!setTime hour:minute [am|pm]`'
    ))
  }

  let time = args[0].split(':')
  if (isNaN(time[0]) || isNaN(time[1])) {
    return message.channel.send(embed.errorEmbed(
      'The first arugment of setTime takes the form `hour:minute`.\n' +
      'Received `' + args[0] + '` instead.'
    ))
  } else if (time[0] < 1 || time[0] > 12 || time[1] < 0 || time[1] > 59 || ('' + time[1]).length != 2) {
    return message.channel.send(embed.errorEmbed(
      '`' + args[0] + ' ' + args[1] + '` is an invalid time.\n'
    ))
  }

  let period = args[1].toLowerCase()
  if (period !== 'am' && period !== 'pm') {
    return message.channel.send(embed.errorEmbed(
      'The second argument of setTime must be `am` or `pm`.\n' +
      'Received `' + period + '` instead.'
    ))
  }

  DB.set('dropTime', [time[0], time[1], period])
  let dropTime = [time[0], time[1], period]
  let formattedTime = time[0] + ':' + time[1] + ' ' + period
  props.updateFormattedTime(dropTime, formattedTime)

  let dropDay = DB.get('dropDay')
  let dropAmount = DB.get('dropAmount')
  let dropFrequency = DB.get('dropFrequency')
  if (typeof dropFrequency === 'undefined' || typeof dropAmount === 'undefined') {
    return message.channel.send(embed.infoEmbed(
      'The drop time has been set to ' + formattedTime + '.\n\n' +
      'However, regular currency drops are not currently enabled.\n' +
      'Use `!help setDrop` to see more information about setting up drops.', 'Drop Day Update Success'
    ))
  } else if (dropFrequency === 'weekly') {
    props.setInitialTimer(message)
    return message.channel.send(embed.infoEmbed(
      'Drops will be given out every ' + fullDay[dropDay] + ' at ' + formattedTime + '.' ,
      'Drop Day Update Success'
    ))
  } else if (dropFrequency === 'daily') {
    props.setInitialTimer(message)
    return message.channel.send(embed.infoEmbed(
      'Drops will be given out daily at ' + formattedTime + '.',
      'Drop Day Update Success'
    ))
  } else if (dropFrequency === 'monthly') {
    props.setInitialTimer(message)
    return message.channel.send(embed.infoEmbed(
      'Drops will be given out on the first of each month at ' + formattedTime + '.',
      'Drop Day Update Success'
    ))
  }
}