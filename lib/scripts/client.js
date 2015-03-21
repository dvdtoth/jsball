"use strict";

var socket = io('http://localhost:8080/');
var Player = require('player.js');
var Field = require('field.js');
var config = require('config.js');

var game = {};


// Create the new player on the field
function drawNewPlayer(player) {
    player.draw();
}


// Create client's player
socket.on('welcome', function (data) {

    // Set up globals for this
    game.player = data.player;

    game.field = data.field;

    // Put it on the field
    game.player.draw();

});

// Draw all players
socket.on('all_players', function (players) {

    for (var i = 0; i < players.length; i++) {
        drawNewPlayer(players[i]);
    }

});

// New arrivals
socket.on('player_entered', function (player) {
    player.draw();
});

// Player left
socket.on('player_left', function (id) {
    game.field.removePlayer(id);
});

// Move other players
socket.on('new_position', function (data) {
    $('.player-' + data.id).css({
        left: data.l,
        top: data.t
    });
});

socket.on('kick', function (id) {
    //@TODO
});

// Name change
socket.on('name_changed', function (data) {
    $('.player-' + data.id).text(data.name);
});


$(function () {

    var area = $('body'),
        maxVal = area.width() - $(game.player.id).width(),
        keyPressed = {},
        distance = 3;

    function newValue(oldVal, keyCode1, keyCode2) {
        var newVal = parseInt(oldVal, 10) - (keyPressed[keyCode1] ? distance : 0) + (keyPressed[keyCode2] ? distance : 0);
        var de = newVal < 0 ? 0 : newVal > maxVal ? maxVal : newVal;
        return de;
    }

    $(window).keydown(function (event) {
        keyPressed[event.which] = true;
    });
    $(window).keyup(function (event) {
        keyPressed[event.which] = false;
    });

    setInterval(function () {

        game.player.x = newValue(theplayer.x, 37, 39);
        game.player.y = newValue(theplayer.y, 38, 40);

        game.player.draw();

    }, 10);
});

//ctx.beginPath();
//    var x = Math.random() * (c.width - radius);
//    var y = Math.random() * (c.height - radius);
//ctx.arc(x, y, radius, 0, 5 * Math.PI);
//ctx.stroke();
//    player.class = '.player-' + player.id;
//    $("<div class='player-" + player.id + "'>" + player.name + "</div>").appendTo("body");
//    $(player.class).css("background-color", player.color);
//}

// Create a loop to move this baby


$(document).ready(function () {
    game.c = document.getElementById("container");
    game.ctx = c.getContext("2d");
    c.setAttribute('width', '600');
    c.setAttribute('height', '300');

    // Change name
    $('.change_name').click(function () {
        game.player.name = prompt('Please insert your name:', game.player.name);
        socket.emit('set_name', {id: game.player.id, name: game.player.name});
    });

});