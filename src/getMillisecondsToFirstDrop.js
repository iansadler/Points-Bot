let msTillEndofDay
let currentMsIntoDay
let dropMsIntoDay

exports.getMillisecondsToFirstDrop = function (dropTime, d, dropFrequency, dropDay) {
  let currentMinIntoDay = d.getHours() * 60 + d.getMinutes()
  currentMsIntoDay = currentMinIntoDay * 60 * 1000 + d.getSeconds() * 1000 + d.getMilliseconds()
  msTillEndofDay = 24 * 60 * 60 * 1000 - currentMsIntoDay

  let dropMinIntoDay = parseInt(dropTime[1])
  if (dropTime[0] === 12) {
    dropMinIntoDay += dropTime[2] === 'am' ? 24 * 60 : 12 * 60
  } else {
    dropMinIntoDay += dropTime[2] === 'am'
    ? parseInt(dropTime[0]) * 60
    : (12 + parseInt(dropTime[0])) * 60
  }
  dropMsIntoDay = dropMinIntoDay * 60 * 1000

  if (dropFrequency === 'daily') {
    return initDailyInterval(msTillEndofDay, currentMsIntoDay, dropMsIntoDay)
  } else if (dropFrequency === 'weekly') {
    return initWeeklyInterval(msTillEndofDay, )
  } else if (dropFrequency === 'monthly') {
    return initMonthlyInterval(msTillEndofDay, )
  }
}

function initDailyInterval () {
  let interval
  if (currentMsIntoDay > dropMsIntoDay) {
    interval = msTillEndofDay + dropMsIntoDay
  } else {
    interval = dropMsIntoDay - currentMsIntoDay
  }
  return interval
}

function initWeeklyInterval () {
  let interval
  let day = d.getDay()
  let currentMsIntoWeek = currentMsIntoDay + day * 24 * 60 * 60 * 1000
  dropDay = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].indexOf(dropDay)
  let dropMsIntoWeek = dropMsIntoDay + dropDay * 24 * 60 * 60 * 1000

  if (currentMsIntoWeek > dropMsIntoWeek) {
    let msTillEndOfWeek = msTillEndofDay + (6 - day) * 24 * 60 * 60 * 1000
    interval = msTillEndOfWeek + dropMsIntoWeek
  } else {
    interval = dropMsIntoWeek - currentMsIntoWeek
  }
  return interval
}

function initMonthlyInterval () {
  let interval
  let curDay = d.getDate()
  let daysInMonth = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()

  if (curDay === 1 && dropMsIntoDay > currentMsIntoDay) {
    interval = dropMsIntoDay - currentMsIntoDay
  } else {
    interval = (daysInMonth - curDay) * 24 * 60 * 60 * 1000 + dropMsIntoDay + msTillEndofDay
  }
  return interval
}