const config = require('../../config/')
const Client = require('recastai').Client
const sendMessage = require('../botConnector')
const initConversation = require('../formatServices/initConversation.js')
const choseTraing = require('../formatServices/choseTraing.js')
const carouselSpaceShip = require('../formatServices/carouselSpaceShip.js')
const trainingMessage = require('../formatServices/trainingMessage.js')
const initMemory = require('./handleMemory.js')
const Space = require('../formatServices/Space.js')
const handleRiddleRetry = require('./handleRiddle.js').handleRiddleRetry
const handleRiddleFix = require('./handleRiddle.js').handleRiddleFix
const handleBattle = require('./handleBattle.js')
const handeleSpaceBattle = require('./handeleSpaceBattle.js')

const client = new Client(config.recastToken, config.language)

function engineFunction(res, action, senderID) {
  return new Promise(resolve => {
    const myHp = res.getMemory('my_hp')
    const monsterHp = res.getMemory('monster_hp')
    const { entities } = res

/*This big stack of else if is just to see what depending on which action we have we trigger a function*/

    if (action.slug === 'greetings') {
      initMemory(senderID)
      resolve(initConversation())
    } else if (action.slug === 'where-are-you-from') {
      resolve(carouselSpaceShip())
    } else if (action.slug === 'which-space-ship') {
      resolve(choseTraing())
    } else if (action.slug === 'training') {
      resolve(trainingMessage())
    } else if (action.slug === 'riddle-response') {
      resolve(handleRiddleRetry(entities, senderID))
    } else if (action.slug === 'battle-vs-monster') {
      handleBattle(entities, myHp, monsterHp, senderID).then(r => resolve(r))
    } else if (action.slug === 'space-trip') {
      resolve(Space.initCombat())
    } else if (action.slug === 'space-battle') {
      handeleSpaceBattle(entities, myHp, monsterHp, senderID).then(r => resolve(r))
    } else if (action.slug === 'fix-ship') {
      resolve(handleRiddleFix(entities))
    }
  })
}

function handleMessage(messageText, senderID, conversation) {
  client.textConverse(messageText.content, { conversationToken: senderID }).then((res) => {
    const { action } = res
    let messages = []

    if (action) {
      /* If we have a reply on the builder */
      if (action.reply) {
        messages = [{ type: 'text', content: action.reply }]
        sendMessage(messages, senderID, conversation)
      } else {
        /* Create are own reply */
        engineFunction(res, action, senderID).then(m => sendMessage(m, senderID, conversation))
      }
    } else {
      messages = [{ type: 'text', content: 'bip......bip..bip..bip, my CPU is overloaded :( Could you please reformulate?' }]
      sendMessage(messages, senderID, conversation)
    }
  }).catch(err => console.log('err recast = ', err))
}

module.exports = handleMessage
