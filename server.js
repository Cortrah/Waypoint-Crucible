'use strict';

const Hapi = require('hapi');
const Joi = require('joi');

const Player = require('./domain/player');
const Match = require('./domain/match');
const randomName = require('./util/random-name.js');

const HOST = 'localhost';
const PORT = 5000;

const server = new Hapi.Server();
server.connection({
    host: HOST,
    port: PORT
});

let players = [];
let matches = [];

server.route([
    {
        method: 'POST',
        path: '/crucible/api/player',
        config: {
            description: 'Takes an ip and port (optionally a name) and returns a registered player with playerId',
            notes: ['Validate that it receives valid inputs and returns a guid, generate a name if not given'],
            validate: {
                payload: {
                    name: Joi.string(),
                    ip: Joi.string().required(),
                    port: Joi.string().required()
                }
            },
            response: {
                schema: {
                    id: Joi.string().guid().required(),
                    name: Joi.string().required(),
                    ip: Joi.string().required(),
                    port: Joi.string().required(),
                    wins: Joi.number().integer().required(),
                    losses: Joi.number().integer().required()
                }
            }
        },
        handler: function (request, reply) {
            let newPlayer = new Player(request.payload.name, request.payload.ip, request.payload.port);
            players.push(newPlayer);

            reply({
                id: newPlayer.id,
                name: newPlayer.name,
                ip: newPlayer.ip,
                port: newPlayer.port,
                wins: newPlayer.wins,
                losses: newPlayer.losses
            });
        }
    }, {
        method: 'GET',
        path: '/crucible/api/players',
        config: {
            description: 'Return a list of players'
        },
        handler: function (request, reply) {

            reply({
                players: players,
            });
        }
    }, {
        method: 'GET',
        path: '/crucible/api/player/{playerId}',
        config: {
            description: 'Return a player'
        },
        handler: function (request, reply) {
            let player = players.find(p => p.id === request.params.playerId);
            reply({
                player: player,
            });
        }
    }, {
        method: 'DELETE',
        path: '/crucible/api/player/{playerId}',
        config: {
            description: 'Delete a player defined by a playerId',
            validate: {
                params: {
                    playerId: Joi.string().guid().required()
                }
            },
        },
        handler: function (request, reply) {
            let index = players.findIndex( p => p.id === request.params.playerId)
            if(index != -1){
                players.splice(index,1);
                reply('player deleted');
            } else {
                reply('player not found');
            }
        }
    }, {
        method: 'POST',
        path: '/crucible/api/match',
        config: {
            description: 'Takes two registered players ids and spawns a match for them, returning the results',
            notes: ['uses guids for the players and match ids, monitor play with local game board to determine victor'],
            validate: {
                payload: {
                    player1Id: Joi.string().guid().required(),
                    player2Id: Joi.string().guid().required()
                }
            },
            response: {
                schema: {
                    matchResults: Joi.object(),
                    message: Joi.string()
                }
            }
        },
        handler: function (request, reply) {

            // extract players from payload playerId's
            // and create a match
            let player1 = players.find(p => p.id === request.payload.player1Id);
            let player2 = players.find(p => p.id === request.payload.player2Id);
            if (player1 === undefined) {
                player1 = new Player(randomName());
                players.push(player1);
            }
            if (player2 === undefined) {
                player2 = new Player(randomName());
                players.push(player2);
            }
            let newMatch = new Match(player1, player2);

            matches.push(newMatch);
            // then play the match until there is a winner
            newMatch.play();

            // then reply with the matchResults
            reply({
                matchResults: newMatch,
                message: newMatch.winner.name + ' won'
            });
        }
    }, {
        method: 'GET',
        path: '/crucible/api/init',
        handler: function (request, reply) {

            let player1 = new Player(randomName());
            players.push(player1);
            let player2 = new Player(randomName());
            players.push(player2);
            let newMatch = new Match(player1, player2);

            matches.push(newMatch);
            // then play the match until there is a winner
            newMatch.play();

            reply({

                match: newMatch,
            });
        }
    }, {
        method: 'GET',
        path: '/crucible/api/matches',
        config: {
            description: 'Return a list of matches'
        },
        handler: function (request, reply) {

            reply({
                matches: matches,
            });
        }
    }, {
        method: 'GET',
        path: '/crucible/api/match/{matchId}',
        config: {
            description: 'Return a match'
        },
        handler: function (request, reply) {
            let match = matches.find(m => m.id === request.params.matchId);
            reply({
                match: match,
            });
        }
    }, {
        method: 'DELETE',
        path: '/crucible/api/match/{matchId}',
        config: {
            description: 'Receives a matchId to delete and make inactive',
            notes: ['Validate that the matchId was valid and the game was active'],
            validate: {
                params: {
                    matchId: Joi.string().guid().required()
                }
            }
        },
        handler: function (request, reply) {
            let index = matches.findIndex(p => p.id === request.params.matchId)
            if (index != -1) {
                matches.splice(index, 1);
                reply('match deleted');
            } else {
                reply('match not found');
            }
        }
    }, {
        method: 'GET',
        path: '/lobby',
        handler: function (request, reply) {
            reply.view('lobby', {
                players: players,
                matches: matches
            });
        }
    }, {
        method: 'GET',
        path: '/match/{matchId}',
        handler: function (request, reply) {
            let match = matches.find(m => m.id === request.params.matchId);
            reply.view('match', {
                match: match
            });
        }
    }, {
        method: 'GET',
        path: '/{params*}',
        config: {
            description: 'Default route for any get handlers, point the user to docs for reference information',
        },
        handler: function (request, reply) {
            reply('Crucible Game Server ' + server.info.uri + '/docs for details')
        }
    }
]);

server.register([
    require('vision'),
    require('inert'),
    require('lout'),
    {
        register: require('good'),
        options: {
            reporters: {
                reporter: [{module: 'good-console'}, 'stdout']
            }
        }
    }
], (err) => {

    if (err) {
        return console.error(err);
    }

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        relativeTo: __dirname,
        path: './views',
        isCached: false
    });

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Waypoint Crucible Server running at:', server.info.uri);
    });
});

module.exports = server;
