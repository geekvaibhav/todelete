const request = require('superagent')
const config = require('../config')

function sendMessage(messages, senderId, conversationId) {
  return new Promise((resolve, reject) => {
    request.post(`${config.url}/users/${config.slug}/bots/${config.botId}/conversations/${conversationId}/messages`)
    .set('Authorization', `Token ${config.botToken}`)
    .send({ messages, senderId })
    .end((err) => {
      if (err) {
        console.log('err =', err)
        reject()
      } else {
        resolve()
      }
    })
  })
}

module.exports = sendMessage
