angular.module('klimaatneutraal.controllers')
    .controller('startGameController', [
        '$rootScope',
        '$scope',
        '$state',
        '$controller',
        '$http',

        function($rootScope, $scope, $state, $controller, $http) {

            var init = function() {
                console.log('startGameController loaded');
                //send to service mail
            };

            init();
        }
    ]);
