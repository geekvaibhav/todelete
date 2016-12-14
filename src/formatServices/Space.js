/*you will use the class Space to send the right message during the space fight*/

class Space {
  static initCombat() {
    return [{
      type: 'text',
      content: 'You just disobeyed your master, one step closer to the dark side you get...',
    }, {
      type: 'text',
      content: 'On your way out of Coruscant, a head hunter starts taking you down 💥💥',
    }, {
      type: 'picture',
      content: 'http://img.lum.dolimg.com/v1/images/slave-i-1_c83f3cc5.jpeg?region=0%2C0%2C800%2C533',
    }, {
      type: 'text',
      content: 'This will not be a easy fight, but remember, the Force is with you !',
    }, {
      type: 'quickReplies', // create quickReplies type
      content: {
        title: 'Pick an action',
        buttons: [
          {
            type: 'text',
            title: 'use your blaster',
            value: 'use your blaster',
          }, {
            type: 'text',
            title: 'use your lazer',
            value: 'use your lazer',
          }, {
            type: 'text',
            title: 'try to avoid fight',
            value: 'try to avoid fight',
          },
        ],
      },
    }]
  }

  static winCombat() {
    return [{
      type: 'text',
      content: 'Your last blaster attack was fatal for your opponent! It\'s up in flames',
    }, {
      type: 'text',
      content: 'After a long fight against that bounty-hunter, your spaceship is in a bad shape. You need to repair the super throttle.',
    }, {
      type: 'text',
      content: 'If you want to continue your journey, you need to repair your ship.\nTo do so, you have two choices: send R2-J8 to repair the super throttle,\nOr try to repair the ship by yourself, from the inside.',
    }, {
      type: 'quickReplies',
      content: {
        title: 'first choice: send R2-J8\nSecond choice try to fix it from the inside',
        buttons: [
          {
            type: 'text',
            title: 'send the droid',
            value: 'send the droid',
          }, {
            type: 'text',
            title: 'do it my self',
            value: 'do it my self',
          },
        ],
      },
    }]
  }

  static lostCombat() {
    return [{
      type: 'text',
      content: '................',
    }, {
      type: 'text',
      content: 'The bounty hunter overpowered you... your ship was completely destroyed :(',
    }, {
      type: 'card',
      only: ['messenger'],
      content: {
        title: 'Be part of an amazing space adventure with Star Wars bot!',
        imageUrl: 'https://d13yacurqjgara.cloudfront.net/users/20934/screenshots/2426736/bb8_1x.png',
        buttons: [{
          type: 'element_share',
        }, {
          title: 'Play',
          type: 'postback',
          value: 'hello',
        }, {
          title: 'Build your Bot',
          type: 'web_url',
          value: 'https://recast.ai',
        }],
      },
    }, {
      only: ['kik'],
      type: 'text',
      content: 'The adventure end hear for you sorry :(',
    }, {
      only: ['kik'],
      type: 'picture',
      content: 'https://d13yacurqjgara.cloudfront.net/users/20934/screenshots/2426736/bb8_1x.png',
    }, {
      only: ['kik'],
      type: 'text',
      content: 'To play again say hello :)',
    }]
  }

  static bugCombat() {
    return [{
      type: 'text',
      content: 'I don\'t now this attack, can you plz chose one from below',
    }, {
      type: 'quickReplies',
      content: {
        title: 'Pick an attack',
        buttons: [
          {
            type: 'text',
            title: 'use your blaster',
            value: 'use your blaster',
          }, {
            type: 'text',
            title: 'use your lazer',
            value: 'use your lazer',
          }, {
            type: 'text',
            title: 'try to avoid fight',
            value: 'try to avoid fight',
          },
        ],
      },
    }]
  }

  static spaceCombat(text, monsterText, hp, monsterHp) {
    return [{
      type: 'text',
      content: text,
    }, {
      type: 'text',
      content: monsterText,
    }, {
      type: 'text',
      content: `HP♥-You: ${hp}\nHP♥-Your ennemy: ${monsterHp}`,
    }, {
      type: 'quickReplies',
      content: {
        title: 'What will be your next attack?',
        buttons: [
          {
            type: 'text',
            title: 'use your blaster',
            value: 'use your blaster',
          }, {
            type: 'text',
            title: 'use your lazer',
            value: 'use your lazer',
          }, {
            type: 'text',
            title: 'try to avoid fight',
            value: 'try to avoid fight',
          },
        ],
      },
    }]
  }

  static runCombat() {
    return [{
      type: 'text',
      content: 'You tried to escape the fight, but the Slave-I is one of the fastest ship in the galaxy',
    }, {
      type: 'picture',
      content: 'https://i.ytimg.com/vi/tquaim7OMaQ/hqdefault.jpg',
    }, {
      type: 'text',
      content: 'You lost the combat :( your are dead, better luck next time',
    }, {
      type: 'card',
      only: ['messenger'],
      content: {
        title: 'Be part of an amazing space adventure with Star Wars bot!',
        imageUrl: 'https://d13yacurqjgara.cloudfront.net/users/20934/screenshots/2426736/bb8_1x.png',
        buttons: [{
          type: 'element_share',
        }, {
          title: 'Play',
          type: 'postback',
          value: 'hello',
        }, {
          title: 'Build your Bot',
          type: 'web_url',
          value: 'https://recast.ai',
        }],
      },
    }, {
      only: ['kik'],
      type: 'text',
      content: 'The adventure end hear for you sorry :(',
    }, {
      only: ['kik'],
      type: 'picture',
      content: 'https://d13yacurqjgara.cloudfront.net/users/20934/screenshots/2426736/bb8_1x.png',
    }, {
      only: ['kik'],
      type: 'text',
      content: 'To play again say hello :)',
    }]
  }

}
module.exports = Space
