const Riddle = require('../formatServices/riddle.js')

function handleRiddleRetry(entities) {
  let wampa = null
  let atst = null
  entities.forEach(e => {
    if (e.name === 'wampa') { wampa = e.raw }
    if (e.name === 'atst') { atst = e.raw }
  })
  if (wampa) {
    return Riddle.resRiddle()
  } else if (atst) {
    return Riddle.repeatRiddle(false)
  }
  return Riddle.repeatRiddle(true)
}

function handleRiddleFix(entities) {
  if (entities.length > 0 && entities[0].name === 'pronoun') {
    return Riddle.fromTheinside()
  }
  return Riddle.sendDroid()
}

module.exports = {
  handleRiddleRetry,
  handleRiddleFix,
}
