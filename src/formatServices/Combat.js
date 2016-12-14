/*you will use the class Combat to send the right message during the fight on Dagobah*/

class Combat {
  static winCombat() {
    return [{
      type: 'text',
      content: 'That last attack was a fatal blow... You can hear the scream of the monster',
    }, {
      type: 'text',
      content: 'You just defeated one of the greatest creatures of all time! Well done Padawan',
    }, {
      type: 'card', //create a card
      only: ['messenger'], // to send only to messenger
      content: {
        title: 'Be part of an amazing space adventure with Star Wars bot!',
        imageUrl: 'https://d13yacurqjgara.cloudfront.net/users/20934/screenshots/2426736/bb8_1x.png',
        buttons: [{
          type: 'element_share',
        }, {
          title: 'Play',
          type: 'postback', //lookup the messenger doc to see the different buttons
          value: 'hello',
        }, {
          title: 'Build your Bot',
          type: 'web_url',
          value: 'https://recast.ai',
        }],
      },
    }, {
      only: ['kik'], // to send only to kik
      type: 'text',
      content: 'Be part of an amazing space adventure with Star Wars bot!',
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

  static lostCombat() {
    return [{
      type: 'text',
      content: 'You feel your last breath leaving you and and are taken over by a shivering cold...',
    }, {
      type: 'text',
      content: 'You lost the fight :( you\'re dead, better luck next time',
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
      content: 'Be part of an amazing space adventure with Star Wars bot!',
    }, {
      only: ['kik'],
      type: 'picture',
      content: 'https://fatunclecheapo.files.wordpress.com/2016/01/new-walkable-abs-metal-rolling-bb8-bb-8-star-wars-the-force-awakens-bb8-bb-8.jpg',
    }, {
      only: ['kik'],
      type: 'text',
      content: 'To play again say hello :)',
    }]
  }

  static bugCombat() {
    return [{
      type: 'text',
      content: 'I don\'t know this move, please choose one from below',
    }, {
      type: 'quickReplies',
      content: {
        title: 'Pick an attack',
        buttons: [
          {
            type: 'text',
            title: 'Choose the force',
            value: 'Choose the force',
          }, {
            type: 'text',
            title: 'Choose lightsaber',
            value: 'Choose lightsaber',
          }, {
            type: 'text',
            title: 'Run like a coward',
            value: 'Run like a coward',
          },
        ],
      },
    }]
  }

  static humanCombat(text, monsterText, hp, monsterHp) {
    return [{

      type: 'text',
      content: text,
    }, {
      type: 'text',
      content: monsterText,
    }, {
      type: 'text',
      content: `HP♥ -You: ${hp}\nHP♥ -Your ennemy: ${monsterHp}`,
    }, {
      type: 'quickReplies',
      content: {
        title: 'next attack',
        buttons: [
          {
            type: 'text',
            title: 'Choose the force',
            value: 'Choose the force',
          }, {
            type: 'text',
            title: 'Choose lightsaber',
            value: 'Choose lightsaber',
          }, {
            type: 'text',
            title: 'run like a coward',
            value: 'run like a coward',
          },
        ],
      },
    }]
  }

  static runCombat() {
    return [{
      type: 'text',
      content: 'You tried to run, but the beast chased you and stabbed you in the back',
    }, {
      type: 'text',
      content: 'You feel your last breath leaving you and and are taken over by a shivering cold...',
    }, {
      type: 'text',
      content: 'You lost the fight :( you\'re dead, better luck next time!',
    }, {
      only: ['messenger'],
      type: 'card',
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
      content: 'Be part of an amazing space adventure with Star Wars bot!',
    }, {
      only: ['kik'],
      type: 'picture',
      content: 'https://fatunclecheapo.files.wordpress.com/2016/01/new-walkable-abs-metal-rolling-bb8-bb-8-star-wars-the-force-awakens-bb8-bb-8.jpg',
    }, {
      only: ['kik'],
      type: 'text',
      content: 'To play again say hello :)',
    }]
  }

}
module.exports = Combat
