import Command from "../../main/Command";

export default class MistleImpact extends Command {

    constructor(data) {
        super('MistleImpact', data);
    }

    do(store){
        let sourceActor = store.actors[this.data.mistle.sourceId];
        let targetActor = store.actors[this.data.mistle.targetId];
        if(store.status === "PLAYING") {
            targetActor.health = Math.max(0, targetActor.health - this.data.mistle.card.value);
            this.data.mistle.landed = true;
            if (targetActor.health <= 0) {
                targetActor.isActive = false;
                let activeOpponents = store.actors.filter(actor => (actor.isActive && actor.team === targetActor.team));
                if(activeOpponents.length === 0){
                    store.winner = sourceActor.team;
                    store.status = "OVER";
                }
            }
        }
        return 'ok'
    }
};
