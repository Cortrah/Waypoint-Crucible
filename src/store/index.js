import Vue from 'vue'
import Vuex from 'vuex'

import lobby from './modules/lobby.js'
import rules from './modules/rules.js'
import game from './modules/game.js'

import * as actions from './actions.js'
import * as getters from './getters.js'
import mutations from './mutations'

//import createLogger from '../../src/plugins/logger.js'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export const state = {
    rules:{
        "maxMana": 10,
        "maxHealth": 30,
        "startingDeck": [0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
        "startingHandSize": 0,
        "maxCards":5,
        "flightTime": 4000,
        "manaGrowthInterval":1000,
        "manaReplentishInterval":1000,
        "drawInterval":1000,
        "fireInterval":500,
        "bleedoutInterval":1000,
        "shieldDecayInterval": 1000
    },
    game:{
        "title": 'Waypoint Crucible',
        "status": "PLAYING",
        "winner": "",
        "commands":[],
        "events":[],
        "players":[
            {
                "id":0,
                "name":"General Scum",
                "team":"Bad Guys",
                "avatarImg": "../static/general_scum.png",
                "maxMana":0,
                "mana":0,
                "maxHealth":30,
                "health":30,
                "shields":[],
                "cards":[],
                "selectedCardIndex":null,
                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                "deckSize":20,
                "drawEnabled":false,
                "isbleedingOut":false,
                "isActive":true
            },
            {
                "id":1,
                "name":"Protobot",
                "team":"Bad Guys",
                "avatarImg": "../static/robot1.png",
                "maxMana":0,
                "mana":0,
                "maxHealth":30,
                "health":30,
                "shields":[],
                "cards":[],
                "selectedCardIndex":null,
                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                "deckSize":20,
                "drawEnabled":false,
                "isbleedingOut":false,
                "isActive":true
            },
            {
                "id":2,
                "name":"Streambot",
                "team":"Bad Guys",
                "avatarImg": "../static/robot2.png",
                "maxMana":0,
                "mana":0,
                "maxHealth":30,
                "health":30,
                "shields":[0],
                "cards":[],
                "selectedCardIndex":null,
                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                "deckSize":20,
                "startingDeckLength":20,
                "drawEnabled":false,
                "isbleedingOut":false,
                "isActive":true
            },
            {
                "id":3,
                "name":"Grammarbot",
                "team":"Bad Guys",
                "avatarImg": "../static/robot3.png",
                "maxMana":0,
                "mana":0,
                "maxHealth":30,
                "health":30,
                "shields":[],
                "cards":[],
                "selectedCardIndex":null,
                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                "deckSize":20,
                "drawEnabled":false,
                "isbleedingOut":false,
                "isActive":true
            },
            {
                "id":4,
                "name":"Lambdabot",
                "team":"Bad Guys",
                "avatarImg": "../static/robot4.png",
                "maxMana":0,
                "mana":0,
                "maxHealth":30,
                "health":30,
                "shields":[],
                "cards":[],
                "selectedCardIndex":null,
                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                "deckSize":20,
                "drawEnabled":false,
                "isbleedingOut":false,
                "isActive":true
            },
            {
                "id":5,
                "name":"Admiral Hope",
                "team":"Good Guys",
                "avatarImg": "../static/admiral_hope.png",
                "maxMana":0,
                "mana":0,
                "maxHealth":30,
                "health":30,
                "shields":[],
                "cards":[],
                "selectedCardIndex":null,
                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                "deckSize":20,
                "drawEnabled":false,
                "isbleedingOut":false,
                "isActive":true
            },
            {
                "id":6,
                "name":"Mina",
                "team":"Good Guys",
                "avatarImg": "../static/dog1.png",
                "maxMana":0,
                "mana":0,
                "maxHealth":30,
                "health":30,
                "shields":[],
                "cards":[],
                "selectedCardIndex":null,
                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                "deckSize":20,
                "drawEnabled":false,
                "isbleedingOut":false,
                "isActive":true
            },
            {
                "id":7,
                "name":"Phoebe",
                "team":"Good Guys",
                "avatarImg": "../static/dog2.png",
                "maxMana":0,
                "mana":0,
                "maxHealth":30,
                "health":30,
                "shields":[],
                "cards":[],
                "selectedCardIndex":null,
                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                "deckSize":20,
                "drawEnabled":false,
                "isbleedingOut":false,
                "isActive":true
            },
            {
                "id": 8,
                "name": "Lucy",
                "team": "Good Guys",
                "avatarImg": "../static/dog3.png",
                "maxMana": 0,
                "mana": 0,
                "maxHealth": 30,
                "health": 30,
                "shields": [],
                "cards": [],
                "selectedCardIndex":null,
                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                "deckSize":20,
                "drawEnabled": false,
                "isbleedingOut": false,
                "isActive": true
            },
            {
                "id":9,
                "name":"Max",
                "team":"Good Guys",
                "avatarImg": "../static/dog4.png",
                "maxMana":0,
                "mana":0,
                "maxHealth":30,
                "health":30,
                "shields":[],
                "cards":[],
                "selectedCardIndex":null,
                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                "deckSize":20,
                "drawEnabled":false,
                "isbleedingOut":false,
                "isActive":true
            },
        ],
        "inFlight":[],
        "timeRunning": 0,
        "timeStarted": 0,
    },
    avatars:[
        { id: '0', name: 'General Scum', img: '../static/general_scum.png' },
        { id: '1', name: 'Protobot', img: '../static/robot1.png' },
        { id: '2', name: 'Streambot', img: '../static/robot2.png' },
        { id: '3', name: 'Grammarbot', img: '../static/robot3.png' },
        { id: '4', name: 'Lambdabot', img: '../static/robot4.png' },
        { id: '5', name: 'Admiral Hope', img: '../static/admiral_hope.png' },
        { id: '6', name: 'Cavalier', img: '../static/dog1.png' },
        { id: '7', name: 'Mini Schnauser', img: '../static/dog2.png' },
        { id: '8', name: 'Boston Terrier', img: '../static/dog3.png' },
        { id: '9', name: 'Border Collie', img: '../static/dog4.png' }
    ]
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations: {
        drawMistle: function(state, playerId){
            let player = state.game.players[playerId];
            if(player.mana >= 1 && player.deck.length > 0) {
                let drawn = player.deck[0];
                player.cards.push(drawn);
                player.deck.splice(0, 1);
                player.deckSize = player.deck.length;
                player.mana--;
            }
        },
        drawShield: function(state, playerId){
            //let player = this.game.players[playerId];
            //let shield = new Shield(player.deck[0]);
            //player.cards.push(shield);
            //player.deck.splice(0,1);
        },
        selectCard: function(state, playerId, cardIndex){
            let player = state.game.players[playerId];
            player.selectedCardIndex = cardIndex;
        },
        targetPlayer: function (state, sourceId, targetId) {
            //if (this.areEnemies(sourceId, targetId)){
                let sourcePlayer = state.game.players[sourceId];
                if(sourcePlayer.selectedCardIndex !== -1) {
                    let card = sourcePlayer.cards[sourcePlayer.selectedCardIndex];
                    if(sourcePlayer.mana >= card){
                        let targetPlayer = state.game.players[targetId];
                        sourcePlayer.mana -= card;
                        sourcePlayer.cards.splice(sourcePlayer.selectedCardIndex, 1);
                        sourcePlayer.selectedCardIndex = -1;
                        this.launchMistle(sourcePlayer, targetPlayer, card)
                    }
                }
            //}
        },

        launchMistle: function(state, sourcePlayer, targetPlayer, card) {
            if(sourcePlayer.isActive){
                // eventually the timer might be different for different cards or mistles
                this.game.inFlight.push({
                    id: new Date(),
                    sourceId: sourcePlayer.id,
                    targetId: targetPlayer.id,
                    card: card,
                    flightTime: this.rules.flightTime
                });
                setTimeout(this.mistleImpact, this.rules.flightTime, sourcePlayer, targetPlayer, card);
            }
        },
        mistleImpact: function(state, sourcePlayer, targetPlayer, mistle){
            if(this.game.status === "PLAYING") {
                targetPlayer.health = Math.max(0, targetPlayer.health - mistle);
                if (targetPlayer.health <= 0) {
                    targetPlayer.isActive = false;
                    this.game.winner = sourcePlayer.team;
                    this.endGame();
                }
            }
        },
        startGame: function(state) {
            console.log("start game called");
            var scope = this;
            //state.game.players.forEach(function(player){
            //    player.deck = scope.shuffle(player.deck);
            //});
            state.game.timeStarted = Date.now();
            state.game.timeRunning = 0;
        },
        gameTick: function(state) {
            state.game.timeRunning = Date.now() - state.game.timeStarted;
        },
        manaTick: function(state) {
            state.game.players.forEach(function(player){
                if(player.maxMana < 10){
                    player.maxMana++;
                }
                if(player.mana < player.maxMana){
                    player.mana++;
                }
                if(player.deck.length <= 0 && player.cards.length === 0 && player.isActive){
                    player.health--;
                }
            })
        },
        endGame: function(state) {
            state.game.status = "OVER";
        }
    },
    methods: {
        areEnemies: function(state, player1Id, player2Id){
            let p1 = state.game.players[player1Id];
            let p2 = state.game.players[player2Id];
            return (p1.team !== p2.team);
        },
        shuffle: function(array) {
            let remaining = array.length;
            let randomIndex;
            let last;

            while (remaining) {
                randomIndex = Math.floor(Math.random() * remaining--);
                last = array[remaining];
                array[remaining] = array[randomIndex];
                array[randomIndex] = last;
            }
            return array;
        }
    },
    modules: {
        lobby,
    },
    strict: debug,
//    plugins: debug ? [createLogger()] : []
})