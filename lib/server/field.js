"use strict"


function Field() {

    this.players = [];
    this.lookup = [];

    this.rebuildLookup = function() {
        var i = 0,
            len = this.players.length;
        for (i, len; i < len; i++) {
            this.lookup[this.players[i].id] = this.players[i];
        }
    };

    // New object created, rebuild lookup array
    this.addPlayer = function (player) {
        this.players.push(player);
        console.log(this.players);
        this.rebuildLookup();
    }

    // To test
    this.removePlayer = function (id) {
        this.players.splice(this.lookup[id], 1)
        this.rebuildLookup();
    }

};

module.exports = Field;