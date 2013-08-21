"use strict";

var socket = io.connect('http://localhost', {port: 8088});

var player = {};

// Create client's player
socket.on('welcome', function (player) {

    // Set up globals for this
    window.player = player;

    // Put it on the field
    drawNewPlayer(window.player);

});

// Draw all players
socket.on('all_players', function (players) {

    for (var i = 0; i < players.length; i++) {
        drawNewPlayer(players[i]);
    }

});

// New arrivals
socket.on('player_entered', function (player) {
    drawNewPlayer(player);
});

// Move other players
socket.on('new_position', function (data) {
    $('.player-' + data.id).css({
        left: data.l,
        top: data.t
    });
});

socket.on('name_changed', function (data) {
    $('.player-' + data.id).text(data.name);
});

// Create the new player on the field
function drawNewPlayer(player) {
    player.class = '.player-' + player.id;
    $("<div class='player-" + player.id + "'>" + player.name + "</div>").appendTo("body");
    $(player.class).css("background-color", player.color);
}

$(function () {

    var area = $('body'),
        maxVal = area.width() - $(window.player.id).width(),
        keyPressed = {},
        distance = 3;

    function newValue(oldVal, keyCode1, keyCode2) {
        var newVal = parseInt(oldVal, 10) - (keyPressed[keyCode1] ? distance : 0) + (keyPressed[keyCode2] ? distance : 0);
        return newVal < 0 ? 0 : newVal > maxVal ? maxVal : newVal;
    }

    $(window).keydown(function (event) {
        keyPressed[event.which] = true;
    });
    $(window).keyup(function (event) {
        keyPressed[event.which] = false;
    });

    window.last_left_pos = 0;
    window.last_top_pos = 0;

    // Create a loop to move this baby
    setInterval(function () {
        $(window.player.class).css({
            left: function (i, v) {
                window.c_left = newValue(v, 37, 39);
                return window.c_left;
            },
            top: function (i, v) {
                window.c_top = newValue(v, 38, 40);
                return window.c_top;
            }
        });

        if (window.last_left_pos != window.c_left) {
            socket.emit('position', {id: window.player.id, l: window.c_left, t: window.c_top});
            window.last_left_pos = window.c_left;
            window.last_top_pos = window.c_top;
        }

    }, 10);
});


$(document).ready(function () {

    // Change name
    $('.change_name').click(function () {
        window.player.name = prompt('Please insert your name:', window.player.name);
        socket.emit('set_name', {id: window.player.id, name: window.player.name});
    });

});