# A Star Wars RPG bot with Bot Connector by Recast.AI!

[intro]: https://blog.recast.ai/wp-content/uploads/2016/12/illu-3.png "intro"
![alt text][intro]

* You can find all the step to build this boat on this [article](https://blog.recast.ai/rpg-bot-star-wars/)


## Set up your Recast.AI account

##### Create your bot

* Log in to your Recast.AI account
* Create a new bot

##### Get your token

* In your profile, click your bot
* In the tab-menu, click on the the little screw
* Here is the `request access token` you will need to configure your bot!

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

## Clone your bot 
```bash 
git clone https://github.com/RecastAI/starwarsbot
```
## Run your bot

* Go back to your bash and run your bot 🙂
```bash
vim config/index.js
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
npm install 
npm run start-dev
```

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
