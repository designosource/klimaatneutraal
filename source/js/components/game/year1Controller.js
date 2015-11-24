angular.module('klimaatneutraal.controllers')
    .controller('year1Controller', [
        '$rootScope',
        '$scope',
        '$state',
        '$controller',
        '$http',
        'mailService',

        function($rootScope, $scope, $state, $controller, $http, mailService) {
            var init = function() {
                console.log('year1Controller loaded');
                console.log(mailService);

            };

            init();
            
            $scope.sendEmail = function() {
                console.log("clicked");
                mailService.sendRapport(/*send*/);

            };
        }
    ]);
