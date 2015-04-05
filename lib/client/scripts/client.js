'use strict';
//var socket = io('http://localhost:8080/');

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
        if (!this.svg) {
            this.svg = document.getElementsByTagName('svg')[0];
        }
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


};


