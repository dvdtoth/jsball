/**
 * Created by dbreuer83 on 22/03/15.
 */
(function() {
    'use strict';
    angular.module('jsBall.services', [])
        .factory('GoogleJSON', GoogleJSON)
        .factory('socket', socket);
        function GoogleJSON($q, $http) {
            return {
                getLocation: function(location) {
                    var deferred = $q.defer();
                    $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=true')
                        .success(function(data) {
                            deferred.resolve(data);
                        }).error(function(msg, code) {
                            deferred.reject(msg);
                            $log.error(msg, code);
                        });
                    return deferred.promise;
                }

            }
        };


        function socket($rootScope) {
            //var socket = io.connect();
            var socket = io('http://localhost:8080/');
            return {
                on: function (eventName, callback) {
                    socket.on(eventName, function () {
                        var args = arguments;
                        $rootScope.$apply(function () {
                            callback.apply(socket, args);
                        });
                    });
                },
                emit: function (eventName, data, callback) {
                    socket.emit(eventName, data, function () {
                        var args = arguments;
                        $rootScope.$apply(function () {
                            if (callback) {
                                callback.apply(socket, args);
                            }
                        });
                    })
                }
            };
        };
})();

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
