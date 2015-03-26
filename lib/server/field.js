"use strict"


function Field() {

    this.players = {};

    /**
     * New player entered
     * @param player
     */
    this.addPlayer = function (player) {
        this.players[player.id] = player;
        console.log(this.players);
    }

    /**
     * Player left
     * @param id
     */
    this.removePlayer = function (id) {
        delete this.players[id];
    }

};

module.exports = Field;