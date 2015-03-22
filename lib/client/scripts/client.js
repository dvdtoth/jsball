"use strict";

var socket = io('http://localhost:8080/');

var radius = 20;

var Game = function () {
    this.drawPlayer = function (player) {
        console.log(player);
        this.playerBody = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.playerBody.setAttributeNS(null, "id", "mycircle");
        this.playerBody.setAttributeNS(null, "cx", player.x);
        this.playerBody.setAttributeNS(null, "cy", player.y);
        this.playerBody.setAttributeNS(null, "r", 25);
        this.playerBody.setAttributeNS(null, "fill", player.color);
        this.playerBody.setAttributeNS(null, "stroke", "none");
        this.svg.appendChild(this.playerBody);

    };
    this.delPlayer = function (x, y) {
        // remove from position
        //this.ctx.clearRect(x - radius - 1, y - radius - 1, radius * 2 + 2, radius * 2 + 2);
    };
    this.movePlayer = function (x, y) {
        this.playerBody.setAttributeNS(null, "cx", x);
        this.playerBody.setAttributeNS(null, "cy", y);
    }
};

var game = new Game();

// Create client's player
socket.on('welcome', function (data) {

    // Set up globals for this
    game.player = data.player;

    game.field = data.field;

    // Put it on the field
    game.drawPlayer(game.player);

});

// Draw all players
socket.on('all_players', function (players) {
    console.log(players);
    for (var i = 0; i < players.length; i++) {
        game.drawPlayer(players[i]);
    }

});

// New arrivals
socket.on('player_entered', function (player) {
    game.drawPlayer(player);
});

// Player left
socket.on('player_left', function (id) {

    var removed = game.field.players[id];
    game.delPlayer(removed.x, removed.y);
});

// Move other players
socket.on('new_position', function (player) {

    game.drawPlayer(player);
});

socket.on('kick', function (id) {
    //@TODO
});

// Name change
socket.on('name_changed', function (data) {
    //$('.player-' + data.id).text(data.name);
});


(function () {

    var area = $('body'),
        maxVal = area.width() - $(game.player.id).width(),
        keyPressed = {},
        distance = 3;

    function newValue(oldVal, keyCode1, keyCode2) {
        var newVal = parseInt(oldVal, 10) - (keyPressed[keyCode1] ? distance : 0) + (keyPressed[keyCode2] ? distance : 0);
        var de = newVal < 0 ? 0 : newVal > maxVal ? maxVal : newVal;
        return de;
    }

    // @ Todo key events
    //$(window).keydown(function (event) {
    //    keyPressed[event.which] = true;
    //});
    //$(window).keyup(function (event) {
    //    keyPressed[event.which] = false;
    //});

    setInterval(function () {

        game.player.x = newValue(theplayer.x, 37, 39);
        game.player.y = newValue(theplayer.y, 38, 40);

        var gamer = game.field.player;
        game.drawPlayer(gamer);

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


window.onload = function () {
    game.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    game.svg.setAttributeNS(null, "width", 600);
    game.svg.setAttributeNS(null, "height", 300);
    document.body.appendChild(game.svg);

    //game.c = document.getElementById("container");
    //game.ctx = game.c.getContext("2d");
    //game.c.setAttribute('width', '600');
    //game.c.setAttribute('height', '300');

    // Change name
    //$('.change_name').click(function () {
    //    game.player.name = prompt('Please insert your name:', game.player.name);
    //    socket.emit('set_name', {id: game.player.id, name: game.player.name});
    //});

};