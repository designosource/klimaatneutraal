angular.module('klimaatneutraal.controllers')
    .controller('startTutorialController', [
        '$rootScope',
        '$scope',
        '$state',
        '$controller',
        '$http',

        function($rootScope, $scope, $state, $controller, $http) {

            var init = function() {
                console.log('startTutorialController loaded');
            };

            init();
        }
    ]);
