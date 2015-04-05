/**
 * Created by dbreuer83 on 22/03/15.
 */
(function() {
    'use strict';



        function version(version) {
            return function(scope, elm, attrs) {
                elm.text(version);
            };
        };

     function directiveGenerator() {
            return {
                restrict: 'AE',
                template: 'soccerfield',
                replace: true
            }
    };

    angular.module('jsBall.directives', [])
        .directive('appVersion', ['version',version])
        .directive('soccerField', [directiveGenerator]);
})();

//<svg id="soccerField" width="22cm" height="14cm" viewBox="0 0 1150 720" stroke="white" version="1.1" xmlns="http://www.w3.org/2000/svg">