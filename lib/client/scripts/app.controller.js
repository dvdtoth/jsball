
/**
 * Created by dbreuer83 on 22/03/15.
 */
(function() {
    'use strict';


        function MainCtrl($scope, ngDialog, GoogleJSON, socket) {
            var jb = this;
            jb.showsoccerfield = false;
            jb.player = {
                name: 'Guest',
                id: '001'
            };

            jb.rooms = [
                {
                    name: 'Room1',
                    players: 2,
                    maxPlayer: 10,
                    auth: false,
                    timestamp: 1428239082,
                    lastModified: 1428239082,
                    location: {
                        lat: 51.507351,
                        long: -0.127758,
                        country: 'UK',
                        city: 'London'
                    }
                },
                {
                    name: 'Room2',
                    players: 9,
                    maxPlayer: 10,
                    auth: false,
                    timestamp: 1428239082,
                    lastModified: 1428239200,
                    location: {
                        lat: 51.507351,
                        long: -0.127758,
                        country: 'UK',
                        city: 'London'
                    }
                },
                {
                    name: 'Room3',
                    players: 10,
                    maxPlayer: 10,
                    auth: false,
                    timestamp: 1428239082,
                    lastModified: 1428239257,
                    location: {
                        lat: 51.507351,
                        long: -0.127758,
                        country: 'UK',
                        city: 'London'
                    }
                }
            ];


            jb.changeName = function( ) {
                var dialog = ngDialog.open({
                    template: '/views/partials/changeName.html',
                    className: 'ngdialog-theme-plain',
                    showClose: false,
                    closeByDocument: false,
                    closeByEscape: false
                });
                dialog.closePromise.then(function (data) {
                    console.log(data);
                    jb.player = data.value;
                    jb.roomlist();

                });
            };

            jb.roomlist = function( ) {
                var roomListDialog = ngDialog.open({
                    template: '/views/partials/roomlist.html',
                    className: 'ngdialog-theme-plain',
                    showClose: false,
                    closeByDocument: false,
                    closeByEscape: false
                });
                roomListDialog.closePromise.then(function (data) {
                    console.log(data);
                });
            };

            jb.joinGame = function() {
                // Create client's player
                console.log("Join Game");
                document.getElementById('container').className = 'fade in';


                $scope.$watch('jb.player.name', function(newval, oldval){
                    if (newval=='Guest' || oldval=='Guest') {
                        jb.changeName();
                    }
                });
                /**
                 * A loop to control player position
                 */
                setInterval(function () {

                    try {
                        game.snapshot = {x: game.localPlayer.x, y: game.localPlayer.y, kick: game.localPlayer.kick};
                        game.localPlayer.x = localPlayerPosition(game.localPlayer.x, 37, 39);
                        game.localPlayer.y = localPlayerPosition(game.localPlayer.y, 38, 40);
                        game.movePlayer(game.localPlayer);
                        // Kick ball effect on space
                        game.localPlayer.kick = (keyPressed[32]) ? true : false;

                        game.playerKick(game.localPlayer.id, game.localPlayer.kick);

                        if (game.snapshot.x !== game.localPlayer.x || game.snapshot.y !== game.localPlayer.y || game.snapshot.kick !== game.localPlayer.kick) {
                            socket.emit('position',{x: game.localPlayer.x, y: game.localPlayer.y, kick: game.localPlayer.kick});
                        }

                    }
                    catch (e) {

                    }
                }, 10);


                game.svg = document.getElementsByTagName('svg')[0];
                document.getElementById('container').appendChild(game.svg);
                svgloaded();
                document.addEventListener('keydown', keyDownEvent, false);
                document.addEventListener('keyup', keyUpEvent, false);
            };

            //todo socket insert


            socket.on('welcome', function (data) {

                console.log(data);
                game.field = data.field;

                // Add all players
                game.drawAllPlayers();

                // Set local player
                game.localPlayer = game.field.players[data.player.id];

            });
            /**
             * Add all players to the game
             */
            socket.on('all_players', function (players) {
                console.log(players);

            });

            /**
             * Add new arrivals
             */
            socket.on('player_entered', function (player) {
                game.field.players[player.id] = player;
                game.drawPlayer(player);
            });

// Player left
            socket.on('player_left', function (id) {
                console.log(id + ' left the game');
                game.removePlayer(id);
            });

// Move players
            socket.on('new_position', function (data) {

                game.field.players[data.id].x = data.x;
                game.field.players[data.id].y = data.y;
                game.movePlayer(game.field.players[data.id]);
                game.playerKick(data.id, data.kick);

            });

            socket.on('kick', function () {
                //@TODO
                var vector = {
                    x: game.bo.getAttribute('cx') + 140,
                    y: game.bo.getAttribute('cy') + 140
                };
                Effects.shot(game.bo, vector);
            });

// Name change
            socket.on('name_changed', function () {
                //$('.player-' + data.id).text(data.name);
            });
        }

    angular.module('jsBall', ['ngDialog', 'jsBall.services'])
        .controller('MainCtrl', MainCtrl);
})();