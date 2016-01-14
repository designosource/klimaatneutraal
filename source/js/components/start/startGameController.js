angular.module('klimaatneutraal.controllers')
    .controller('startGameController', [
        '$rootScope',
        '$scope',
        '$state',
        '$controller',
        '$http',
        'soundService',

        function($rootScope, $scope, $state, $controller, $http, soundService) {

            var init = function() {
                console.log('startGameController loaded');
                //send to service mail
            };

            $scope.playConfirmSound = function() {
                soundService.confirm.play();
            };

            init();
        }
    ]);
