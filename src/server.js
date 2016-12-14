const express = require('express')
const bodyParser = require('body-parser')

const handleMessage = require('./bot/bot.js')
const config = require('../config')

const app = express()
app.set('port', process.env.PORT || config.port || 5000)
app.use(bodyParser.json())

/* Get the request from the connector */

app.post('/', (req) => {
  const { attachment, conversation } = req.body.message
  const senderId = req.body.senderId
  handleMessage(attachment, senderId, conversation)
})

app.listen(app.get('port'), () => {
  console.log('Our bot is running on port', app.get('port'))
})
