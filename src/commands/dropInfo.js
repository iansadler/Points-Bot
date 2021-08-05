const { DB } = require('../db.js')
const embed = require('../embeds.js')
const { fullDay } = require('../constants/fullDay.js')

exports.dropInfo = function (args, message, props) {
  let dropFrequency = DB.get('dropFrequency')
  let dropAmount = DB.get('dropAmount')
  let dropDay = DB.get('dropDay')
  if (typeof dropFrequency === 'undefined' || typeof dropAmount === 'undefined') {
    return message.channel.send(embed.infoEmbed(
      'Drops are currently not enabled.\n\n' +
      'To enable, use `!setDrop [daily | weekly | monthly] amount`',
      ':sob:'
    ))
  }

  let text = ''
  if (dropFrequency === 'daily') {
    text = dropAmount + ' ' + props.currency + ' will be given out each day at ' + props.formattedTime + '.'
  } else if (dropFrequency === 'weekly') {
    text = dropAmount + ' ' + props.currency + ' will be given out every ' + fullDay[dropDay] + ' at ' + props.formattedTime + '.'
  } else if (dropFrequency === 'monthly') {
    text = dropAmount + ' ' + props.currency + ' will be given out on the first day of each month at ' + props.formattedTime + '.'
  }

  return message.channel.send(embed.infoEmbed(
    text, ':gift:'
  ))
}
