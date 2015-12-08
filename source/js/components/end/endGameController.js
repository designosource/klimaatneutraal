angular.module('klimaatneutraal.controllers')
    .controller('endGameController', [
        '$rootScope',
        '$scope',
        '$state',
        '$controller',
        '$http',
        'mailService',

        function($rootScope, $scope, $state, $controller, $http, mailService) {

            
            $scope.sendTheMail = function() {
                var emailUser = $("#userEmail").val();
                
/*                mailService.sendMandrill('name', 'firstName', emailUser);
*/                mailService.sendMailchimp('name', 'firstName', emailUser);

                    };
                }
    ]);
