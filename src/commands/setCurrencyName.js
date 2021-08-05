const { DB } = require('../db.js')
const embed = require('../embeds.js')

exports.setCurrencyName = function (args, message, props) {
  if (args.length === 0) return message.channel.send(
    embed.errorEmbed(
      '!setCurrencyName requires an argument.\n\n' +
      '`!setCurrencyName name`'
    )
  )

  let oldCurName = DB.get('currencyName')
  currency = args.reduce((a,b) => a + ' ' + b)
  DB.set('currencyName', currency)
  props.updateCurrencyName(currency)

  return message.channel.send(embed.infoEmbed(
    'The name of the currency for this server has been changed from `' + oldCurName + '` to `' + currency + '`',
    'Currency Update Success'
  ))
}