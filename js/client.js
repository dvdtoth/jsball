"use strict";

var socket = io.connect('http://localhost', {port: 8088});

var player = {};

var radius = 20;
var fieldHeigth = 600;
var fieldWidth = 600;

// Player object definition
function Player(id) {
    this.x: Math.random() * (fieldHeigth - radius),
    this.y: Math.random() * (fieldWidth - radius),
    this.id = id;
    this.name = 'anon';
    this.color = getRandomColor();
    players.push(this);

    rebuildLookup();

}

var theplayer = {
    x: Math.random() * (600 - radius),
    y: Math.random() * (300 - radius),
    pre_x: this.x,
    pre_y: this.y,
    draw: function () {
        // clean up old position
        ctx.clearRect(this.pre_x - radius -1, this.pre_y - radius -1, radius *2 +2, radius *2 +2);

        // draw to new place
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.arc(this.x, this.y, radius, 0, 5 * Math.PI);
        ctx.stroke();
    }
};

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

// Player left
socket.on('player_left', function (id) {
    deletePlayer(id);
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


// Create the new player on the field
function drawNewPlayer(player) {
    theplayer.draw();
}
//ctx.beginPath();
//    var x = Math.random() * (c.width - radius);
//    var y = Math.random() * (c.height - radius);
//ctx.arc(x, y, radius, 0, 5 * Math.PI);
//ctx.stroke();
//    player.class = '.player-' + player.id;
//    $("<div class='player-" + player.id + "'>" + player.name + "</div>").appendTo("body");
//    $(player.class).css("background-color", player.color);
//}

// Remove left player's div
function deletePlayer(id) {

    var div = document.getElementsByClassName('player-' + id);

    for (var i = 0, len = div.length; i < len; i++) {
        div[i].parentNode.removeChild(div[i]);
    }

}

$(function () {

    var area = $('body'),
        maxVal = area.width() - $(window.player.id).width(),
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

    window.last_left_pos = 0;
    window.last_top_pos = 0;

    // Create a loop to move this baby
    setInterval(function () {
        theplayer.xold = theplayer.x;
        theplayer.yold = theplayer.y;
        theplayer.x = newValue(theplayer.x, 37, 39);
        theplayer.y = newValue(theplayer.y, 38, 40);

        theplayer.draw();


//        player.y = newValue(v, 38, 40);

//        $(window.player.class).css({
//            left: function (i, v) {
//                window.c_left = newValue(v, 37, 39);
//                return window.c_left;
//            },
//            top: function (i, v) {
//                window.c_top = newValue(v, 38, 40);
//                return window.c_top;
//            }
//        });

//        if (window.last_left_pos != window.c_left) {
//            socket.emit('position', {id: window.player.id, l: window.c_left, t: window.c_top});
//            window.last_left_pos = window.c_left;
//            window.last_top_pos = window.c_top;
//        }

    }, 10);
});


$(document).ready(function () {
    window.c = document.getElementById("container");
    window.ctx = c.getContext("2d");
    c.setAttribute('width', '600');
    c.setAttribute('height', '300');

    // Change name
    $('.change_name').click(function () {
        window.player.name = prompt('Please insert your name:', window.player.name);
        socket.emit('set_name', {id: window.player.id, name: window.player.name});
    });

});