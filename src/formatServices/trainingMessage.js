/* send back text and quick reply*/

function trainingMessage() {
  return [{
    type: 'text',
    content: 'After a two hours trip, you land on Dagobah, the swamp-covered planet, to meet one of the oldest jedi of the galaxy: master Yoda.',
  }, {
    type: 'picture',
    content: 'http://www.phoenixisrisen.co.uk/wp-content/uploads/2015/04/dagobah.jpg',
  }, {
    type: 'text',
    content: 'To learn the true power of the Force, he presents you with two difficult tasks, one for the mind, and one for the body.',
  }, {
    type: 'text',
    content: 'Let\'s start with a simple riddle:',
  }, {
    type: 'text',
    content: 'During the battle of Hoth, you\'re faced with 1 Wampa and 3 AT-ST.',
  }, {
    type: 'text',
    content: 'You know that your chances to win against the Wampa are 1 on 5 but your chances to defeat one AT-ST are 1 on 2.',
  }, {
    type: 'quickReplies',
    content: {
      title: 'They are approaching, and you need to take the first shot, fast! What do you do?!',
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
  },
]
}

module.exports = trainingMessage
