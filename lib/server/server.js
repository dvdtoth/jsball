"use strict";

var config = require('./../../config.js');
var io = require('socket.io')(config.io.port);
var Player = require('./player.js');
var Field = require('./field.js');

var field = new Field;

io.sockets.on('connection', function (client) {

    // Set up a new player
    var player = new Player(client.id);

    console.log('New player entered: ' + client.id);
    field.addPlayer(player);

    // Send the list of existing players
    client.emit('all_players', field.players);
    console.log(field.players);

    var welcomeData = {player: player, field: field};

    // Send it to the client
    client.emit('welcome', welcomeData);

    // Notify other clients about the new player
    client.broadcast.emit('player_entered', player);

    // Broadcast new position of clients
    client.on('position', function (data) {
        client.broadcast.emit('new_position', data);
    });

    // Change name of a player
    client.on('set_name', function (data) {

        // TODO Check if the nick already taken

        field.lookup[data.id].setName(data.name);
        client.emit('name_changed', data);
        client.broadcast.emit('name_changed', data);
    });

    // socket disconnected
    client.on('disconnect', function () {
        client.broadcast.emit('player_left', client.id);
        field.removePlayer(client.id);
    });

});


