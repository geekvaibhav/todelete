class Riddle {

  static resRiddle() {
    return [{
      type: 'text',
      content: 'Having a sharp mind is not enough to be a jedi, you also need to prove your strength and bravery!',
    }, {
      type: 'text',
      content: 'Master Yoda gets an old dusty map from his sleeve, with a location marking the nest of a terrible monster.',
    }, {
      type: 'text',
      content: 'Understanding what he is suggesting, you take your belongings and go. After a few minutes of walking into the swamp, the legendary Dragonsnake jumps in front of you!',
    }, {
      type: 'picture',
      content: 'http://vignette4.wikia.nocookie.net/starwars/images/0/07/Dragonsnake_AA.jpg/revision/latest?cb=20071123162313',
    }, {
      type: 'text',
      content: 'What do you do ?',
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

  static repeatRiddle(type) {
    const messages = []
    if (type) {
      messages.push({ type: 'text', content: 'I don\'t answer what you\'ve just said, please choose from the replies below.' })
    } else {
      messages.push({ type: 'text', content: 'Nice try, but your choice can cost the life of your companions.\nDo you really think that\'ll work?' })
    }
    messages.push({
      type: 'quickReplies',
      content: {
        title: 'first choice: fight one Wampa \nSecond choice: fight tree AT-ST',
        buttons: [
          {
            type: 'text',
            title: 'Fight the Wampa',
            value: 'Fight the Wampa',
          }, {
            type: 'text',
            title: 'Fight the AT-ST',
            value: 'Fight the AT-ST',
          },
        ],
      },
    })
    return messages
  }

  static sendDroid() {
    return [{
      type: 'picture',
      content: 'http://vignette3.wikia.nocookie.net/starwars/images/3/34/Red-domed_astromech.jpg/revision/latest?cb=20090316182051',
    }, {
      type: 'text',
      content: 'R2-J8 is an awesome droid and did his best, but one of the fuse burned up and needs to be replaced. The closest planet is Tatooine, you need to land to buy a new one right now!',
    }, {
      type: 'picture',
      content: 'https://i.ytimg.com/vi/jy0OzfDELT0/maxresdefault.jpg',
    }, {
      type: 'text',
      content: 'To be continued...',
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
      content: 'You\'ve reached the end of this adventure! Well played :)',
    }, {
      only: ['kik'],
      type: 'picture',
      content: 'https://d13yacurqjgara.cloudfront.net/users/20934/screenshots/2426736/bb8_1x.png',
    }, {
      only: ['kik'],
      type: 'text',
      content: 'To play again, say hello :)',
    }]
  }

  static fromTheinside() {
    return [{
      type: 'picture',
      content: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTVn1ZEEa0p4hUgt1VucEW-L6W9Cj18vGfoIFWsOal6-MA9slb3',
    }, {
      type: 'text',
      content: 'You\'re a really good mecanich, you found the problem in less than a hour! Unfortunately, one of the fuse burned up and needs to be replaced. The closest planet is Tatooine, you need to land to buy a new one right now!',
    }, {
      type: 'picture',
      content: 'https://i.ytimg.com/vi/jy0OzfDELT0/maxresdefault.jpg',
    }, {
      type: 'text',
      content: 'To be continued...',
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
      content: 'You\'ve reached the end of this adventure! Well played :)',
    }, {
      only: ['kik'],
      type: 'picture',
      content: 'https://d13yacurqjgara.cloudfront.net/users/20934/screenshots/2426736/bb8_1x.png',
    }, {
      only: ['kik'],
      type: 'text',
      content: 'To play again, say hello :)',
    }]
  }
  static repeatSpaceRiddle() {
    return [{
      type: 'text',
      content: 'If you want to continue your journey, you need to repair your ship.\nTo do so, you have two choices: send R2-J8 to repair the super throttle,\nOr try to repair the ship by yourself, from the inside.',
    }, {
      type: 'quickReplies',
      content: {
        title: 'first choice: send R2-J8\nSecond choice: try to fix it yourself',
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
}
module.exports = Riddle
