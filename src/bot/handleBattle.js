const Combat = require('../formatServices/Combat.js')
const Conversation = require('recastai').Conversation
const config = require('../../config')

/*this code will make all the rand to creat a dynamique fight and will call the memory of the bot to see if the battle is over*/

function handleBattle(entities, myHp, monsterHp, senderID) {
  return new Promise(resolve => {
    const random = Math.round(Math.random() * (3 - 1) + 1)
    let damage = 0
    let attack = null
    let fuite = null
    /*find the type of attack*/
    entities.forEach(e => {
      if (e.name === 'attack') { attack = e.raw }
      if (e.name === 'fuite') { fuite = e.raw }
    })

    if (random !== 3) { damage = Math.round(Math.random() * (9 - 5) + 5) }

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
          if (newMonstHp <= 0) { resolve(Combat.winCombat()) }
          if (newHp <= 0) { resolve(Combat.lostCombat()) }
          if (attack === 'force') {
            if (random === 1) { nameOfAttak = 'You Choose the force, choke the monster'; nameOfBeast = 'Enraged by the wound, the monster swings its tail at you' }
            if (random === 2) { nameOfAttak = 'You focus the Force to pick up a big tree'; nameOfBeast = 'the monster throws his big claws at you' }

            if (random === 3) { resolve(Combat.humanCombat('Your attack failed completely ', `the monster throws big fireballs at you and does ${yourdamage} damage.`, newHp, newMonstHp)) }

            resolve(Combat.humanCombat(`${nameOfAttak} and do ${damage} damage`, `${nameOfBeast} and do ${yourdamage}`, newHp, newMonstHp))
          } else if (attack === 'lightsaber') {
            if (random === 1) { nameOfAttak = 'You jump in action and fight like a beast'; nameOfBeast = 'the beast hits you' }
            if (random === 2) { nameOfAttak = 'You put all your strenghts on you strongest arm and throw your lightsaber at the monster'; nameOfBeast = 'the monster throws his big claws at you' }

            if (random === 3) { resolve(Combat.humanCombat('Your attack failed completely', `the monster throws big fireballs at you and does ${yourdamage} damage.`, newHp, newMonstHp)) }

            resolve(Combat.humanCombat(`${nameOfAttak} and do ${damage} damage`, `${nameOfBeast} and do ${yourdamage} damage`, newHp, newMonstHp))
          } else {
            resolve(Combat.humanCombat(`You focus the Force to pick up a big tree and do ${damage} damage.`, `the monster throws his big claws at you and do ${yourdamage} damage.`, newHp, newMonstHp))
          }
        }).catch(e => console.log(e))
      }).catch(e => console.log(e))
    } else if (fuite) {
      Conversation.setMemory(config.recastToken, senderID, {
        my_hp: { maxHp: 10, currentHp: 0 } }).then(() => resolve(Combat.runCombat()))
   } else {
      resolve(Combat.bugCombat())
   }
    })
  }

  module.exports = handleBattle
