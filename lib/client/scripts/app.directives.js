/**
 * Created by dbreuer83 on 22/03/15.
 */
'use strict';

/* Directives */


angular.module('jsBall.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]);