'use strict';

module.exports = class Queue {

    constructor (playHead = 0, commands = []) {
        this.playhead = playHead;
        this.commands = commands;
        this.isRunning = false;
    }

    add(command) {
        this.commands.push(command);
    }

    async play(stage, data) {
        this.isRunning = true;
        while(this.isRunning && (this.playhead < this.commands.length)){
            let command = this.commands[this.playhead];
            await command.doAction(stage, data)
            if(this.playhead < this.commands.length + 1) {
                this.playhead++;
            }
        }
    }

    pause() {
        this.isRunning = false;
    }
};