/*Send back a carouselle of space ship*/
function carouselSpaceShip() {
  return [{
    type: 'text',
    content: 'Nice!',
  }, {
    type: 'text',
    content: 'To continue this space adventure, you need a spaceship! Which one would you like?',
  }, {
    type: 'carouselle',
    content: [{
      title: 'Millennium-falcon',
      subtitle: 'A legendary starship despite its humble origins and deceptively shabby exterior',
      imageUrl: 'http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/article_width/public/2016/01/millennium-falcon.jpg?itok=cwdSb769',
      buttons: [
        {
          title: 'Millennium Falcon',
          type: 'postback',
          value: 'I pick the millennium-falcon',
        }],
    }, {
      title: 'Hammerhead-class',
      subtitle: 'Warship used by the Republic Navy during the Old Sith Wars',
      imageUrl: 'http://vignette3.wikia.nocookie.net/starwars/images/2/2d/Endarconcept.jpg/revision/latest?cb=20080624043154',
      buttons: [{
        title: 'Hammerhead class',
        type: 'postback', // See Facebook Messenger button formats
        value: 'I chosse Hammerhead-class',
      }],
    }, {
      title: 'Jedi Starfighter',
      subtitle: 'Jedi starfighter normally controlled by Jedis',
      imageUrl: 'http://www.starstore.com/acatalog/Jedi-Starfighter.jpg',
      buttons: [{
        title: 'Jedi Starfighter',
        type: 'postback',
        value: 'I like to fly with the Jedi-Starfighter',
      }],

    }, {
      title: 'X-Wing',
      subtitle: 'Versatile Rebel Alliance starfighter',
      imageUrl: 'https://images-cdn.fantasyflightgames.com/filer_public/26/9f/269f5975-d103-44af-b3d7-579251b9f6eb/swx57_preview3.jpg',
      buttons: [{
        title: 'X-Wing',
        type: 'postback',
        value: 'I will chosse the X-wing',
      }],
    },
    ],
  }]
}

module.exports = carouselSpaceShip
