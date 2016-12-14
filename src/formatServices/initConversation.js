/*this function will just return a carouselle of planet*/

function initConversation() {
  return [{
    type: 'text',
    content: `Welcome to Coruscant! Or should I say young padawan?`,
  }, {
    type: 'text',
    content: 'In this interactive adventure, each one of your answers will greatly impact your adventure.\nI will be your guide, so follow my instructions and everything will be fine',
  }, {
    type: 'text',
    content: 'We are going to start easy. Where are you from ?',
  }, {
    type: 'carouselle',
    content: [{
      title: 'Alderaan',
      subtitle: 'Renowned for its captivating beauty, Alderaan’s verdant forests and snow-capped mountain',
      imageUrl: 'http://vignette1.wikia.nocookie.net/starwars/images/4/4a/Alderaan.jpg/revision/latest?cb=20061211013805',
      buttons: [
        {
          title: 'Alderaan',
          type: 'postback',
          value: 'I come from Alderaan',
        }],
    }, {
      title: 'Yavin IV',
      subtitle: 'The Rebels established their base in the ancient Massassi ruins found in the lush jungles of Yavin 4 following the abandonment of their previous base on the planet Dantooine.',
      imageUrl: 'http://vignette4.wikia.nocookie.net/starwars/images/a/a0/Eaw_Yavin4.jpg/revision/latest?cb=20060418114439',
      buttons: [{
        title: 'Yavin IV',
        type: 'postback',
        value: 'I come from Yavien IV',
      }],
    }, {
      title: 'Hoth',
      subtitle: 'One of the most remote and lifeless planets in the known galaxy',
      imageUrl: 'http://vignette4.wikia.nocookie.net/starwars/images/1/1d/Hoth_SWCT.png/revision/latest?cb=20160630022322',
      buttons: [{
        title: 'Hoth',
        type: 'postback',
        value: 'I come from Hoth',
      }],
    }, {
      title: 'Dagobah',
      subtitle: 'Dagobah is a swamp-covered planet, Home to Yoda during his final years',
      imageUrl: 'http://vignette2.wikia.nocookie.net/starwars/images/4/48/Dagobah_ep3.jpg/revision/latest?cb=20100122163146',
      buttons: [{
        title: 'Dagobah',
        type: 'postback',
        value: 'I come from Dagobah',
      }],
    }, {
      title: 'Bespin',
      subtitle: 'Secluded from galactic turmoil by its location in a little-visited sector of space',
      imageUrl: 'http://vignette3.wikia.nocookie.net/starwars/images/2/2c/Bespin_EotECR.png/revision/latest?cb=20151017214807',
      buttons: [{
        title: 'Bespin',
        type: 'postback',
        value: 'I come from Bespin',
      }],
    }, {
      title: 'Endor',
      subtitle: 'Secluded in a remote corner of the galaxy',
      imageUrl: 'http://vignette2.wikia.nocookie.net/starwars/images/9/96/Endor-DB.png/revision/latest?cb=20150920045330',
      buttons: [{
        title: 'Endor',
        type: 'postback',
        value: 'I come from Endor',
      }],
    },
  ],
  }]
}

module.exports = initConversation
