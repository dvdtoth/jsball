/**
 * Created by dbreuer83 on 22/03/15.
 */
'use strict';

/* Filters */

angular.module('jsBall.filters', []).
    filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }]);