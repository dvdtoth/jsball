// @TODO Move to conf
var radius = 20;
var fieldHeigth = 600;
var fieldWidth = 600;


function draw() {
    // clean up old position
    ctx.clearRect(this.x - radius - 1, this.y - radius - 1, radius * 2 + 2, radius * 2 + 2);

    // draw to new place
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.arc(this.x, this.y, radius, 0, 5 * Math.PI);
    ctx.stroke();
}

// A very quick way of generating a random color
function getRandomColor() {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16);
}

// Player object definition
function Player(id) {
    this.id = id;
    this.name = 'anon';

    this.x = Math.random() * (fieldHeigth - radius);
    this.y = Math.random() * (fieldWidth - radius);
    this.id = id;
    this.name = 'anon';
    this.color = getRandomColor();
    this.setName = function (name) {
        this.name = name;
    }
    this.draw = draw();
}

module.exports = Player;
