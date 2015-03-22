/**
 * Created by dbreuer83 on 22/03/15.
 */
jsBall
    .controller('MainCtrl', function($scope, socket){

        //todo socket insert


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

        $scope.messages = [];

        $scope.sendMessage = function () {
            socket.emit('send:message', {
                message: $scope.message
            });

            // add the message to our model locally
            $scope.messages.push({
                user: $scope.name,
                text: $scope.message
            });

            // clear message box
            $scope.message = '';
        };

    });