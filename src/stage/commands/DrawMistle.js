'use strict';

const Command = require("../../main/Command");

module.exports = class DrawMistle extends Command {

    constructor(stage, data) {
        super('draw-mistle', stage, data);
    }

    doAction() {
        let store = this.stage.store;
        let data = this.data;
        if(data != undefined ){
            let actor = store.actors[data.actorId];
        }
        if(actor && actor.mana >= 1 && actor.deck.length > 0) {
            let drawn = actor.deck[0];
            actor.cards.push({cardType:"MISTLE", value: drawn});
            actor.deck.splice(0, 1);
            actor.deckSize = actor.deck.length;
            actor.mana--;
        }
        return 'ok'
    }
};
