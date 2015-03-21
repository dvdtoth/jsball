"use strict"

var players = [];
var lookup = [];

function Field() {

    this.rebuildLookup = function() {
        var i = 0,
            len = players.length;
        for (i, len; i < len; i++) {
            lookup[players[i].id] = players[i];
        }
    };

    // New object created, rebuild lookup array
    this.addPlayer = function (player) {
        players.push(player);
        this.rebuildLookup();
    }

    // To test
    this.removePlayer = function (id) {
        players.splice(lookup[id], 1)
        this.rebuildLookup();
    }

    this.lookup = lookup;
};

module.exports = Field;