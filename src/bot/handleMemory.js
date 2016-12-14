const config = require('../../config')
const Conversation = require('recastai').Conversation

function initMemory(senderID) {
  Conversation.resetConversation(config.recastToken, senderID).then(() => {
    Conversation.setMemory(config.recastToken, senderID, {
      my_hp: {
        maxHp: 10,
        currentHp: 10,
      } }).catch(e => console.log('myhp = ', e))
    Conversation.setMemory(config.recastToken, senderID, {
      monster_hp: {
        maxHp: 20,
        currentHp: 20,
      } }).catch(e => console.log('monster_hp = ', e))
  })
}

module.exports = initMemory
