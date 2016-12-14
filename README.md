# Build a Star Wars RPG bot with Bot Connector by Recast.AI!

[intro]: https://blog.recast.ai/wp-content/uploads/2016/12/illu-3.png "intro"
![alt text][intro]

## What are we going to build ?

### A bot!
* The bot we are going to build is a role playing game (RPG) bot around the Star Wars universe. This bot will be created with Recast.AI and Bot Connector.
* You will be able to use this bot on Facebook Messenger and on Kik, and you can find the finished product [here](https://www.messenger.com/t/SWbot)!

### What is a RPG bot ?

* Well, it can be defined as a bot who does not just provide information, but makes you an actor in a compelling story. Each of your answers will take you on a different storyline.
* If you’d like to know more about where we got the idea, read this [Gamesbook](https://en.wikipedia.org/wiki/Gamebook) Wikipedia page.

### What are we going to learn ?

* This bot is developed in NodeJs, and we’ll use ES5.
* We’re using the Recast.AI technology, and everything we use will be explained step by step.
* First step, for any part of the tutorial, is to create your Recast.AI account!

# Star Wars Bot V1

## Setup the bot
* We’re going to create the bot from scratch, and the first step takes place on Recast.AI. If you’re familiar with the platform and want to directly dive in the code, you can find the bot [here](https://recast.ai/recast-ai/starwars/learn) and fork it. If not, let’s get started!

* Create the bot :

 [create-bot]: https://blog.recast.ai/wp-content/uploads/2016/12/S%C3%A9lection_030.jpg "Create-bot"
 ![alt text][create-bot]

* Create your intent, An intent is a box of expressions that mean the same thing but are constructed in different ways. Intents are the heart of your bot understanding. Each one of your intents represents one thing your bot is able to understand.

* We need these first three intents to initiate the conversation of the bot. In each intent, enter expressions. Expressions are sentences that mean the same thing but are constructed differently. They will trigger specific actions in the bot.

[Intents]: https://blog.recast.ai/wp-content/uploads/2016/12/S%C3%A9lection_032.jpg "Intents"
![alt text][Intents]


* Greetings: any possible way to say “hello”

[Greetings]: https://blog.recast.ai/wp-content/uploads/2016/12/S%C3%A9lection_050.jpg "Greetings"
![alt text][Greetings]

* Which-space-ship: simple sentences with the name of a Star Wars spaceship. All spaceship names are then tagged as “spaceship”

* You just created a entity :).

* An entity is a keyword extracted from an expression. We automatically detect 31 different entities such as datetimes, names, locations, etc. We call them Gold entities. But you are not limited to these Gold entities: you can also tag your own custom entities to detect keywords depending on your bot context, such as metro stations if you are building a transport assistant. To bring you a precise service with a true added value, we are enriching each of our Gold entities with core information.

[spaceship]: https://blog.recast.ai/wp-content/uploads/2016/12/S%C3%A9lection_049.jpg "spaceship"
![alt text][spaceship]


* Where-are-you-from: same as the previous intent, but with planets.

[spaceship]: https://blog.recast.ai/wp-content/uploads/2016/12/S%C3%A9lection_051.jpg "spaceship"
![alt text][spaceship]

* These three intents are the initiation of the conversation. Now, to create a unique experience and story for the user, let’s jump into Bot Builder!

[planets]: https://blog.recast.ai/wp-content/uploads/2016/12/S%C3%A9lection_039.jpg "planets"
![alt text][planets]

* Each intent becomes an action. Put your three actions on the map, and connect them to each other. Use a green link between greetings and where-are-you-from and use a red link between where-are-you-from and which-space-ship. That means that while greetings is an action that can be skipped, where-are-you-from is necessary to continue to the next action.

[build]: https://blog.recast.ai/wp-content/uploads/2016/12/S%C3%A9lection_040.jpg "build"
![alt text][build]

* After adding your first 3 actions, you need to set up notions and replies in where-are-your-from and which-space-ship. Notions match entities, and are keywords your bot needs to know at this point of the conversation to move forward. Replies are specific answers your bot should give after the action is completed or when a notion is missing. In this case, set up a reply if “PLANET” is missing, but don’t set up one when the action is done. This stands for the entire tutorial.

[notion]: https://blog.recast.ai/wp-content/uploads/2016/12/S%C3%A9lection_041.jpg "notion"
![alt text][notion]

[rep]: https://blog.recast.ai/wp-content/uploads/2016/12/S%C3%A9lection_042.jpg "rep"
![alt text][rep]

* Now that your architecture is all good on the platform, let’s dive into the code.

## Setup the code

* Much like before, we’re going to start from scratch. But if you like to move faster, you can clone the code from this repo.

```bash
mkdir bot-starwars || cd bot-starwars

npm init
npm add nodemon
npm add expresse
npm add body-parser
npm add recastai
npm add superagent
```

* These are all the modules you need for this first bot.

## Create your server.js

* The following file creates a server and connects the web chat service of your choice (Kik, Slack, Messenger, ….) to your bot.

```bash
vim server.js
```

```javascript
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

```

## Create your bot.js

* The following file is your state machine. It decides what to answer according to the user reply and the conversation advancement.

* The function handleMessage() will send the text to Recast.AI.

* Recast.AI will send back a JSON with key informations (intent and matching ratio, entity and matching ratio, sentiment analysis, etc). This data helps you decide what you should reply.

* After getting the response, check if the action has an answer setup on Bot Builder. If it doesn’t, call a engineFunction()

```javascript
const config = require('../../config/')
const Client = require('recastai').Client
const sendMessage = require('../botConnector').sendMessage
const initConversation = require('../formatServices/initConversation.js')
const carouselSpaceShip = require('../formatServices/carouselSpaceShip.js')
const initMemory = require('./handleMemory.js')

const client = new Client(config.recastToken, config.language)
function engineFunction(res, action, senderID) {
 return new Promise(resolve => {
   const myHp = res.getMemory('my_hp')
   const monsterHp = res.getMemory('monster_hp')
   const { entities } = res

   if (action.slug === 'greetings') {
     initMemory(senderID)
     resolve(initConversation())
   } else if (action.slug === 'where-are-you-from') {
     resolve(carouselSpaceShip())
   } else if (action.slug === 'which-space-ship') {
     resolve([{type: ‘text’, content: ‘to be continue’}])
   }
 })
}

function handleMessage(messageText, senderID, conversation) {
 client.textConverse(messageText.content, { conversationToken: senderID }).then((res) => {
   const { action } = res
   let messages = []

   if (action) {
     if (action.reply) {
       messages = [{ type: 'text', content: action.reply }]
       sendMessage(messages, senderID, conversation)
     } else {
       engineFunction(res, action, senderID).then(m => sendMessage(m, senderID, conversation))
     }
   } else {
     messages = [{ type: 'text', content: 'bip......bip..bip..bip, my CPU is overloaded :( Could you please reformulate?' }]
     sendMessage(messages, senderID, conversation)
   }
 }).catch(err => console.log('err recast = ', err))
}

module.exports = handleMessage
```
* initConversation(), carouselSpaceShip() are really simple functions but get really long, so I created two gists on Github. Have a look, the code is commented 🙂
* initConversation() = github gist
* carouselSpaceShip() = github gist

## Create your bot on Bot Connector

* Bot Connector allows you to connect your bot to multiple channels at the same time with only one API integration.
* Create a new account on Bot Connector or use your Recast.AI account

[home-connector]: https://blog.recast.ai/wp-content/uploads/2016/12/S%C3%A9lection_043.jpg "home-connector"
![alt text][home-connector]

* Let’s start by creating a new bot, pick a name you like.
* To create the URL of you bot, create a webhook. That will create a tunnel from your bot to Bot Connector. We’re using a ngrok webhook, but you can use any kind of webhook you like.
* if you don’t have ngrok, check [this](https://ngrok.com/download) out to get started.

```bash
ngrok http 5000
```

[create-bot-connector]: https://blog.recast.ai/wp-content/uploads/2016/12/S%C3%A9lection_044.jpg "create-bot-connector"
![alt text][create-bot-connector]

* Nice, you now have a first version of your bot! Now, let’s connect it to channels.

* Bot Connector has two main zones:

 * in the orange selection, pick the channel you want

 * in the purple selection, configure your integration

* In this tutorial, we’ll cover the Messenger integration, feel free to discover Slack and Kik on your own. 🙂

[setup-messenger]: https://blog.recast.ai/wp-content/uploads/2016/12/S%C3%A9lection_045.jpg "setup-messenger"
![alt text][setup-messenger]

* So, you need two things: your page token and your app token.
* You’ll find you page token here:
* https://developers.facebook.com/apps/YOUR-APP-ID/messenger/
* and your app token here:
* https://developers.facebook.com/apps/YOUR-APP-ID/dashboard/
* After adding your channel, the connector will send you back a url and a webhook token. Put those information in the Facebook Developer page.

[setup-messenger-logs]: https://blog.recast.ai/wp-content/uploads/2016/12/S%C3%A9lection_048-1.jpg "setup-messenger-logs"
![alt text][setup-messenger-logs]

* You now have a bot connected to Facebook!

## Create your botConnector.js file

* You need a function send the message to Bot Connector

```bash
vim botConnect.js
```
```javascript
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
```

## Run your bot

* Go back to your bash and run your bot 🙂
```bash
mkdir config || cd config
vim index.js
```
```javascript
const config = {}

config.recastToken = 'Recast token'
config.botToken = 'Bot token'
config.language = 'en'
config.url= 'https://api-botconnector.recast.ai'
config.botId = 'Bot id from bot-connector'
config.slug = 'Usename of bot-connector'
module.exports = config
```

```bash
npm run start-dev
```

* Now, you should be able to have a nice conversation! 🙂

# Star Wars Bot v2

## Teach the v2 of your bot

* Let’s create new intents! You can fork all of them to skip this step [here](https://recast.ai/recast-ai/starwars/learn).

[tab-intents]: https://blog.recast.ai/wp-content/uploads/2016/12/Sélection_052.jpg "tab-intents"
![alt text][tab-intents]
* The  last intent you make is not used in the classification, it’s simply here to create two new files in the memory of your bot.
* memory = "MonsterHP, MyHP" as "MonsterHP, MyHP"

## Build the v2 of your bot

* Let’s jump back in the Builder and start building the end of the flow. It’s really easy, simply create a conversation flow like this one

[bot-builderV2]: https://blog.recast.ai/wp-content/uploads/2016/12/S%C3%A9lection_046.jpg "bot-builderV2"
![alt text][bot-builderV2]

* Add two notions to the action “memory”:
[Notion-v2]: https://blog.recast.ai/wp-content/uploads/2016/12/S%C3%A9lection_047.jpg "Notion-v2"
![alt text][Notion-v2]

## Update the code of your bot’s V2

* Let’s go back to the bot.js file and add a few functions:
* Much like before, check what action is called and trigger the right one.

```javascript
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
     if (action.reply) {

       messages = [{ type: 'text', content: action.reply }]
       sendMessage(messages, senderID, conversation)
     } else {
       engineFunction(res, action, senderID).then(m => sendMessage(m, senderID, conversation))
     }
   } else {
   messages = [{ type: 'text', content: 'bip......bip..bip..bip, my CPU is overloaded :( Could you please reformulate?' }]
   sendMessage(messages, senderID, conversation)
  }
 }).catch(err => console.log('err recast = ', err))
}

module.exports = handleMessage
```
* Just like for initConversation() and carouselSpaceShip(), I created github gists and commented the code, go and check it out!
* choseTraing() = github gist
* trainingMessage() = github gist
* Space = github gist
* Pay specific attention to the four new functions:
```javascript
initMemory()
handleRiddleRetry()
handleRiddleFix()
handleBattle()
handeleSpaceBattle()
```
* Let’s start by initMemory(). This function sets the memory of your bot at a init start each time that the user says hello.
* Each time a new conversation starts, the game starts with zero info.
* Even if this function is asynchronous, we will not set a promise because we don’t need this information yet.

```javascript

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
```

* handleRiddleRetry() and handleRiddleFix()
* These two functions take care of the riddle action. It detects which entities are present in the sentence and allows you to see if the user guess right or wrong.

```javascript
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
```
* handleBattle() and handeleSpaceBattle() are basically the same function, so it’s easy to understand.
* So here’s how the fighting system works: the player has 10-HP, the opponent has 20-hp. During each attack, the player has 1 chance out of 2 to miss his shot. If his attack is successful, he does 5 to 9 damage. The opponent can not miss but can only inflict 1 to 3 damage. To make the game more interactive, we’ll make a different message for each attack.
* You’ll find the code on this GitHub gist.

## Run the v2 of your bot

* npm run start-dev
* Talk to your bot, and enjoy the magic!
* Your bot is running, it’s now up to you to create a compelling story for your users!
* To help you in your bot building quest, you’ll find some other resources on our blog, such as a [complete tutorial on our Bot Builder](https://blog.recast.ai/build-first-bot-botbuilder//), our [best practices for bot building](https://blog.recast.ai/great-chatbot-building/), or this [ultimate channel cheat sheet](https://blog.recast.ai/how-to-choose-the-best-channel-for-your-bot-the-ultimate-cheat-sheet/) to help you pick the best one for your use case!

Happy coding,

## Author

Henri Floren - Recast.AI
henri.floren@recast.ai

You can follow us on Twitter at [@recastai](https://twitter.com/recastai) for updates and releases.

## License

Copyright (c) [2016] [Recast.AI](https://recast.ai)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
