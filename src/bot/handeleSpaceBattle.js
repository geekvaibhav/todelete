const Space = require('../formatServices/Space.js')
const Conversation = require('recastai').Conversation
const config = require('../../config')


/* this code will make all the rand to creat a dynamique fight and will call the memory of the bot to see if the battle is over */
function handeleSpaceBattle(entities, myHp, monsterHp, senderID, planet) {
  return new Promise(resolve => {
    const randome = Math.round(Math.random() * (3 - 1) + 1)
    let damage = 0
    let attack = null
    let fuite = null
    /*find the type of attack*/
    entities.forEach(e => {
      if (e.name === 'attack') { attack = e.raw }
      if (e.name === 'fuite') { fuite = e.raw }
    })
    if (randome !== 3) { damage = Math.round(Math.random() * (9 - 5) + 5) }

    const yourdamage = Math.round(Math.random() * (3 - 1) + 1)
    const newMonstHp = monsterHp.currentHp - damage
    const newHp = myHp.currentHp - yourdamage

    if (attack) {
      /*Get the memory*/
      Conversation.setMemory(config.recastToken, senderID, {
        monster_hp: { maxHp: 20, currentHp: newMonstHp },
      }).then(() => {
        Conversation.setMemory(config.recastToken, senderID, {
          my_hp: { maxHp: 10, currentHp: newHp },
        }).then(() => {
          let nameOfAttak = null
          let nameOfBeast = null
          /* Send the right message */
          if (newMonstHp <= 0) { resolve(Space.winCombat(planet)) }
          if (newHp <= 0) { resolve(Space.lostCombat()) }
          if (attack === 'lazer') {
            if (randome === 1) { nameOfAttak = 'You hit him in the right-side blaster'; nameOfBeast = 'the bounty hunter fires back' }
            if (randome === 2) { nameOfAttak = 'You hit the main engine'; nameOfBeast = 'the bounty hunter fires back' }

            if (randome === 3) { resolve(Space.spaceCombat(`You missed it by ${damage + 1} meters :(`, `the bounty hunter fires back and does ${yourdamage} damage.`, newHp, newMonstHp)) }

            resolve(Space.spaceCombat(`${nameOfAttak} you do ${damage} damage`, `${nameOfBeast} and do ${yourdamage} damage`, newHp, newMonstHp))
          } else if (attack === 'blaster') {
            if (randome === 1) { nameOfAttak = 'You hit him in the right-side blaster'; nameOfBeast = 'the bounty hunter fires back' }
            if (randome === 2) { nameOfAttak = 'You hit the main engine'; nameOfBeast = 'the bounty hunter fires back' }

            if (randome === 3) { resolve(Space.spaceCombat(`You missed it by ${damage + 1} meters :(`, `the bounty hunter fires back and does ${yourdamage} damage.`, newHp, newMonstHp)) }

            resolve(Space.spaceCombat(`${nameOfAttak} you do ${damage} damage`, `${nameOfBeast} and do ${yourdamage} damage`, newHp, newMonstHp))
          } else {
            resolve(Space.spaceCombat(`You hit him in the right-side blaster, you do ${damage} damage, he only has ${newMonstHp} Hp left`, `the bounty hunter fires back and does ${yourdamage} damage.`, newHp, newMonstHp))
          }
        }).catch(e => console.log(e))
      }).catch(e => console.log(e))
    } else if (fuite) {
      Conversation.setMemory(config.recastToken, senderID, {
        my_hp: { maxHp: 10, currentHp: 0 },
      }).then(() => resolve(Space.runCombat()))
    } else {
       resolve(Space.bugCombat())
    }
  })
}

  module.exports = handeleSpaceBattle
