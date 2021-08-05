require('dotenv').config()
const { DB } = require('./db.js')
const { depositAll } = require('./depositAll.js')
const { getMillisecondsToFirstDrop } = require('./getMillisecondsToFirstDrop.js')
const { help } = require('./commands/help.js')
const { setDay } = require('./commands/setDay.js')
const { setDrop } = require('./commands/setDrop.js')
const { setTime } = require('./commands/setTime.js')
const { dropInfo } = require('./commands/dropInfo.js')
const { transfer } = require('./commands/transfer.js')
const { standings } = require('./commands/standings.js')
const { initDeposit } = require('./commands/initDeposit.js')
const { setCurrencyName } = require('./commands/setCurrencyName.js')
const { Client, Intents } = require('discord.js')
const intents = new Intents([
  Intents.NON_PRIVILEGED,
  'GUILD_MEMBERS'
])
const client = new Client({ ws: { intents: intents } })

let timer
let currency = ''
let formattedTime = ''
const PREFIX = '!'
const msPerDay = 24 * 60 * 60 * 1000

client.on('ready', () => {
  console.log(`${client.user.tag}`)
  DB.set('dropDay', 'fri')
  DB.set('dropTime', [6, 00, 'pm'])
  DB.set('currencyName', 'points')
  DB.set('balance', {})
  currency = 'points'
  formattedTime = '6:00 pm'
})

client.on('message', (message) => {
  if (message.author.bot) return
  if (message.content.startsWith(PREFIX)) {
    const [CMD, ...args] = message.content
      .trim()
      .substring(1)
      .split(/\s+/)
    const CMD_NAME = CMD.toLowerCase()
    if (CMD_NAME === 'setdrop') {
      setDrop(args, message, { currency:currency, formattedTime:formattedTime, setInitialTimer:setInitialTimer })
    } else if (CMD_NAME === 'dropinfo') {
      dropInfo(args, message, { currency:currency, formattedTime:formattedTime })
    } else if (CMD_NAME === 'setcurrencyname') {
      setCurrencyName(args, message, { updateCurrencyName:updateCurrencyName })
    } else if (CMD_NAME === 'initdeposit') {
      initDeposit(args, message, { currency:currency })
    } else if (CMD_NAME === 'help') {
      help(args, message, { currency:currency })
    } else if (CMD_NAME === 'standings') {
      standings(args, message, { currency:currency })
    } else if (CMD_NAME === 'setday') {
      setDay(args, message, { setInitialTimer:setInitialTimer })
    } else if (CMD_NAME === 'settime') {
      setTime(args, message, { updateFormattedTime:updateFormattedTime, setInitialTimer:setInitialTimer })
    } else if (CMD_NAME === 'transfer') {
      transfer(args, message, { currency:currency })
    }
  }
})

client.login(process.env.DISCORDJS_BOT_TOKEN)

function setInitialTimer (message) {
  clearInterval(timer)
  let dropDay = DB.get('dropDay')
  let dropTime = DB.get('dropTime')
  let dropFrequency = DB.get('dropFrequency')
  if (typeof dropFrequency !== 'undefined') {
    let interval = getMillisecondsToFirstDrop(dropTime, new Date(), dropFrequency, dropDay)
    if (typeof interval !== 'undefined') {
      timer = setInterval(initialTimerEvent, interval, message)
    }
  }
}

function initialTimerEvent (message) {
  let dropFrequency = DB.get('dropFrequency')
  if (typeof dropFrequency !== 'undefined') {
    currencyDrop(message)
    clearInterval(timer)

    let interval = msPerDay
    if (dropFrequency === 'weekly') {
      interval *= 7
    } else if (dropFrequency === 'monthly') {
      let d = new Date()
      let daysInMonth = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()
      interval *= daysInMonth
    }

    if (typeof interval !== 'undefined') {
      timer = setInterval(currencyDrop, interval, message)
    }
  }
}

function currencyDrop (message) {
  depositAll(message, DB.get('dropAmount'), currency)
}

function updateFormattedTime (dropT, formattedT) {
  formattedTime = formattedT
}

function updateCurrencyName (currencyName) {
  currency = currencyName
}