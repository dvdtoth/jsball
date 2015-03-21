"use strict";

var io = require('socket.io').listen(8088);

var players = [];
var lookup = {};

// A very quick way of generating a random color
function getRandomColor() {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16);
}

// Create a handy lookup object
function rebuildLookup() {
    var i = 0,
        len = players.length;
    for (i, len; i < len; i++) {
        lookup[players[i].id] = players[i];
    }
}

// Player object definition
function Player(id) {
    this.id = id;
    this.name = 'anon';
    this.color = getRandomColor();
    players.push(this);

    rebuildLookup();

}


// Allow users to change their name
Player.prototype.setName = function (name) {
    this.name = name;
};


io.sockets.on('connection', function (client) {

    // Send the list of existing players
    client.emit('all_players', players);

    // Set up a new player
    var player = new Player(client.id);
    // Send it to the client
    client.emit('welcome', player);

    // Notify other clients about the new player
    client.broadcast.emit('player_entered', player);

    // Broadcast new position of clients
    client.on('position', function (data) {
        client.broadcast.emit('new_position', data);
    });

    // Change name of a player
    client.on('set_name', function (data) {

        // TODO Check if the nick already taken

        lookup[data.id].setName(data.name);
        client.emit('name_changed', data);
        client.broadcast.emit('name_changed', data);
    });

    // socket disconnected
    client.on('disconnect', function () {
        players.splice(lookup[client.id], 1);
        rebuildLookup();
        client.broadcast.emit('player_left', client.id);
    });

});


