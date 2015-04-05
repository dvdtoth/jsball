/**
 * Created by dbreuer83 on 22/03/15.
 */
(function() {
    'use strict';

angular.module('jsBall.filters', [])
    .filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }])
    .filter('locateRoom', [ function() {
        return function(location) {
            return
        }
    }]);
})();