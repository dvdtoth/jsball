'use strict';



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





    //var area = document.body,
    //    maxVal = area.style.width - document.getElementById(game.player.id).style.width,
    //    keyPressed = {},
    //    distance = 3;
    //
    //function newValue(oldVal, keyCode1, keyCode2) {
    //    var newVal = parseInt(oldVal, 10) - (keyPressed[keyCode1] ? distance : 0) + (keyPressed[keyCode2] ? distance : 0);
    //    var de = newVal < 0 ? 0 : newVal > maxVal ? maxVal : newVal;
    //    return de;
    //}
    //
    //// @ Todo key events
    ////$(window).keydown(function (event) {
    ////    keyPressed[event.which] = true;
    ////});
    ////$(window).keyup(function (event) {
    ////    keyPressed[event.which] = false;
    ////});
    //
    //setInterval(function () {
    //
    //    game.player.x = newValue(theplayer.x, 37, 39);
    //    game.player.y = newValue(theplayer.y, 38, 40);
    //
    //    var gamer = game.field.player;
    //    game.drawPlayer(gamer.x, gamer.y);
    //
    //}, 10);


    setInterval(function () {
        try {
            game.player.x = newValue(theplayer.x, 37, 39);
            game.player.y = newValue(theplayer.y, 38, 40);

            var gamer = game.field.player;
            game.drawPlayer(gamer);
        }
        catch(e){

        }


    }, 10);


//ctx.beginPath();
//    var x = Math.random() * (c.width - radius);
//    var y = Math.random() * (c.height - radius);
//ctx.arc(x, y, radius, 0, 5 * Math.PI);
//ctx.stroke();
//    player.class = '.player-' + player.id;
//    $('<div class='player-' + player.id + ''>' + player.name + '</div>').appendTo('body');
//    $(player.class).css('background-color', player.color);
//}

// Create a loop to move this baby


window.onload = function () {
    //game.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    game.svg = document.getElementsByTagName('svg')[0];
    //game.svg.setAttributeNS(null, "width", 600);
    //game.svg.setAttributeNS(null, "height", 300);
    document.getElementById('container').appendChild(game.svg);
    svgloaded();

    //document.body.addEventListener('load', svgloaded);

    //game.c = document.getElementById("container");
    //game.ctx = game.c.getContext("2d");
    //game.c.setAttribute('width', '600');
    //game.c.setAttribute('height', '300');
}


function svgloaded() {
    var bo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    bo.setAttributeNS(null, "id", "ball");
    bo.setAttributeNS(null, "cx", 30);
    bo.setAttributeNS(null, "cy", 20);
    bo.setAttributeNS(null, "r", 10);
    bo.setAttributeNS(null, "fill", '#ffff99');
    bo.setAttributeNS(null, "stroke", "none");
    game.svg.appendChild(bo);

        try {
            Effects.shot(bo, {x: 140, y: 160});
        } catch(e) {
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
