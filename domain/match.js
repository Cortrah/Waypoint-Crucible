'use strict';

const uuid = require('uuid');

module.exports = class Match {

    constructor(player1, player2) {
        this.id = uuid.v4();
        this.name = player1.name + ' vs ' + player2.name;
        // order in the array determines who goes first
        this.players = [];
        this.actions = [];
        this.winner = null;

        // randomize who gets to go first
        if(this.coinFlip() === true){
            this.players.push(player1);
            this.players.push(player2);
        } else {
            this.players.push(player2);
            this.players.push(player1);
        }
    }

    play () {
        while(this.winner === null) {
            // if the other players ships are not sunk
            if (this.players[1].ai.shipsRemaining() > 0) {
                // ask for a shot from the first player
                let shot = this.players[0].ai.targetMyShot();

                // get a result from the second player
                // first via http ala wreck
                // but also check it for accuracy myself
                let shotResult = this.players[1].ai.receiveShot(shot.row, shot.col);

                // return a result to the first player
                this.players[0].ai.recordMyShotResult(shotResult);

                this.actions.push({
                    "action": 'shot',
                    "playerId": this.players[0].id,
                    "playerName": this.players[0].name,
                    "target": shot,
                    "result": shotResult
                });

                let shipsLeft = this.players[1].ai.shipsRemaining();
                // check for victory again
                if (shipsLeft === 0) {
                    // notify of victory
                    this.winner = this.players[0];
                    this.players[0].wins++;
                    this.players[1].losses++;
                }
            }
            if( this.winner === null) {
                if (this.players[0].ai.shipsRemaining() > 0) {
                    // ask for a shot from the first player
                    let shot = this.players[1].ai.targetMyShot();

                    // get a result from the second player
                    // first via http ala wreck
                    // but also check it for accuracy myself
                    let shotResult = this.players[0].ai.receiveShot(shot.row, shot.col);

                    // return a result to the first player
                    this.players[1].ai.recordMyShotResult(shotResult);

                    this.actions.push({
                        "action": 'shot',
                        "playerId": this.players[1].id,
                        "playerName": this.players[1].name,
                        "target": shot,
                        "result": shotResult
                    });

                    let shipsLeft = this.players[0].ai.shipsRemaining();
                    // check for victory again
                    if (shipsLeft === 0) {
                        // notify of victory
                        this.winner = this.players[1];
                        this.players[1].wins++;
                        this.players[0].losses++;
                    }
                }
            }
        }
    }

    coinFlip() {
        return Math.round(Math.random()) === 1;
    }
};
