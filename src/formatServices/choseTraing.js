/* send back the quick reply to make the good choose*/

function choseTraing() {
  return [{
    type: 'text',
    content: 'Great choice! I just received a message from an old jedi living as a hermit on the planet Dagobah, looking for a new padawan!',
  }, {
    type: 'quickReplies',
    content: {
      title: 'Do you want to go on Dagobah to meet him? Or use your new ship to explore space?',
      buttons: [
        {
          type: 'text',
          title: 'fly to Dagobah',
          value: 'fly to Dagobah',
        }, {
          type: 'text',
          title: 'Travel to space',
          value: 'Travel to space',
        },
      ],
    },
  },
]
}
module.exports = choseTraing
