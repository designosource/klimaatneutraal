angular.module('klimaatneutraal.controllers')
    .controller('TutorialController', [
        '$rootScope',
        '$scope',
        '$state',
        '$controller',
        '$http',

        function($rootScope, $scope, $state, $controller, $http) {

            var init = function() {
                console.log('TutorialController loaded');
                
            };

            init();
        }
    ]);
