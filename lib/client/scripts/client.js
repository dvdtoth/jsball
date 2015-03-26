'use strict';
var socket = io('http://localhost:8080/');

//var radius = 20;
//var Effects = new Effects();
/**
 * Creates a game context for the client
 * @constructor
 */
var Game = function () {

    // All players of this game
    this.field = {};

    // Local player object
    this.localPlayer = {};

    /**
     * Draw a player object on the field
     * @param player
     */
    this.drawPlayer = function (player) {

        console.log('drawing player ' + player.id);
        this.field.players[player.id].playerBody = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.field.players[player.id].playerBody.setAttributeNS(null, 'id', 'myplayer');
        this.field.players[player.id].playerBody.setAttributeNS(null, 'cx', player.x);
        this.field.players[player.id].playerBody.setAttributeNS(null, 'cy', player.y);
        this.field.players[player.id].playerBody.setAttributeNS(null, 'r', 25);
        this.field.players[player.id].playerBody.setAttributeNS(null, 'fill', player.color);
        this.field.players[player.id].playerBody.setAttributeNS(null, 'stroke', 'black');
        this.field.players[player.id].playerBody.setAttributeNS(null, 'stroke-width', '2');
        this.svg.appendChild(this.field.players[player.id].playerBody);

    };

    /**
     * Remove a player object from the field
     * @param x
     * @param y
     */
    this.removePlayer = function (id) {
        this.svg.removeChild(this.field.players[id].playerBody);
        delete this.field.players[id];
    };

    /**
     * Move the client's object
     */
    this.movePlayer = function (player) {
        this.field.players[player.id].playerBody.setAttributeNS(null, 'cx', this.field.players[player.id].x);
        this.field.players[player.id].playerBody.setAttributeNS(null, 'cy', this.field.players[player.id].y);
    };


    this.playerKick = function (id, kick) {
        this.field.players[id].kick = kick;
        if (kick) {
            this.field.players[id].playerBody.setAttributeNS(null, 'stroke', 'white');
        } else {
            this.field.players[id].playerBody.setAttributeNS(null, 'stroke', 'black');
        }


    };

    this.drawAllPlayers = function () {
        var players = this.field.players;
        console.log(players);
        for (var id in players) {
            this.drawPlayer(players[id]);
        }
    };

    this.snapshot = {};
};

/**
 * Creates control
 * @constructor
 */
//var Control = function () {
//
//};
//
//var control = new Control();

// Initiate a new Game object for this client
var game = new Game();

// Create client's player
socket.on('welcome', function (data) {

    console.log(data);
    game.field = data.field;

    // Add all players
    game.drawAllPlayers();

    // Set local player
    game.localPlayer = game.field.players[data.player.id];

});

/**
 * Add all players to the game
 */
socket.on('all_players', function (players) {
    console.log(players);

});

/**
 * Add new arrivals
 */
socket.on('player_entered', function (player) {
    game.field.players[player.id] = player;
    game.drawPlayer(player);
});

// Player left
socket.on('player_left', function (id) {
    console.log(id + ' left the game');
    game.removePlayer(id);
});

// Move players
socket.on('new_position', function (data) {

    game.field.players[data.id].x = data.x;
    game.field.players[data.id].y = data.y;
    game.movePlayer(game.field.players[data.id]);
    game.playerKick(data.id, data.kick);

});

socket.on('kick', function () {
    //@TODO
    var vector = {
        x: game.bo.getAttribute('cx') + 140,
        y: game.bo.getAttribute('cy') + 140
    };
    Effects.shot(game.bo, vector);
});

// Name change
socket.on('name_changed', function () {
    //$('.player-' + data.id).text(data.name);
});

var keyPressed = {};

function keyDownEvent() {
    keyPressed[event.which] = true;
}

function keyUpEvent() {
    keyPressed[event.which] = false;
}

/**
 * Calculate local player position
 * @param oldVal
 * @param keyCode1
 * @param keyCode2
 * @returns {number}
 */
function localPlayerPosition(oldVal, keyCode1, keyCode2) {
    var distance = 3;
    var area = document.getElementById('container');
    var maxVal = area.offsetWidth - document.getElementById('myplayer').offsetWidth;

    var newVal = parseInt(oldVal, 10) - (keyPressed[keyCode1] ? distance : 0) + (keyPressed[keyCode2] ? distance : 0);
    return newVal < 0 ? 0 : newVal > maxVal ? maxVal : newVal;
}

/**
 * A loop to control player position
 */
setInterval(function () {
    try {
        game.snapshot = {x: game.localPlayer.x, y: game.localPlayer.y, kick: game.localPlayer.kick};
        game.localPlayer.x = localPlayerPosition(game.localPlayer.x, 37, 39);
        game.localPlayer.y = localPlayerPosition(game.localPlayer.y, 38, 40);
        game.movePlayer(game.localPlayer);
        // Kick ball effect on space
        game.localPlayer.kick = (keyPressed[32]) ? true : false;

        game.playerKick(game.localPlayer.id, game.localPlayer.kick);

        if (game.snapshot.x !== game.localPlayer.x || game.snapshot.y !== game.localPlayer.y || game.snapshot.kick !== game.localPlayer.kick) {
            socket.emit('position',{x: game.localPlayer.x, y: game.localPlayer.y, kick: game.localPlayer.kick});
        }

    }
    catch (e) {

    }
}, 10);

function svgloaded() {
    game.bo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    game.bo.setAttributeNS(null, 'id', 'ball');
    game.bo.setAttributeNS(null, 'cx', 30);
    game.bo.setAttributeNS(null, 'cy', 20);
    game.bo.setAttributeNS(null, 'r', 10);
    game.bo.setAttributeNS(null, 'fill', '#ffff99');
    game.bo.setAttributeNS(null, 'stroke', 'none');
    game.svg.appendChild(game.bo);

    try {
        Effects.shot(game.bo, {x: 140, y: 160});
    } catch (e) {
        console.log(e);
    }

    //var gn = svg.getElementById('greenBlock');
    //gn.setAttribute('fill', '#ff0000');


    // Change name
    //$('.change_name').click(function () {
    //    game.player.name = prompt('Please insert your name:', game.player.name);
    //    socket.emit('set_name', {id: game.player.id, name: game.player.name});
    //});

}

window.onload = function () {
    //game.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    game.svg = document.getElementsByTagName('svg')[0];
    //game.svg.setAttributeNS(null, 'width', 600);
    //game.svg.setAttributeNS(null, 'height', 300);
    document.getElementById('container').appendChild(game.svg);

    svgloaded();

    document.addEventListener('keydown', keyDownEvent, false);
    document.addEventListener('keyup', keyUpEvent, false);

};


