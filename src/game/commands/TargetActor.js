import Command from "../../main/Command";

export default class TargetActor extends Command {

    constructor(data) {
        super('TargetActor', data);
    }

    do(store){
        let data = this.data;
        if(typeof data !== 'undefined') {
            let sourceActor = store.actors[data.sourceId];
            let targetActor = store.actors[data.targetId];
            let card = sourceActor.cards[data.cardIndex];
            if (sourceActor.mana >= card.cardValue) {
                sourceActor.mana -= card.cardValue;
                sourceActor.cards.splice(sourceActor.selectedCardIndex, 1);
                sourceActor.selectedCardIndex = -1;
                if (card.cardType === "MISTLE") {
                    store.mistles.push(card);
                } else if (card.cardType === "SHIELD") {
                    targetActor.shields.push(card);
                }
            }
        }
        return 'ok'
    }
};
