angular.module('klimaatneutraal.controllers')
    .controller('endGameController', [
        '$rootScope',
        '$scope',
        '$state',
        '$controller',
        '$http',
        'mailService',

        function($rootScope, $scope, $state, $controller, $http, mailService) {
            var init = function() {
                console.log('endGameController loaded');
                console.log(mailService);

            };

            init();
            
            $scope.sendEmail = function() {
                console.log("clicked");
                mailService.sendRapport(/*send*/);

            };
        }
    ]);
