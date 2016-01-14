angular.module('klimaatneutraal.controllers')
    .controller('endGameController', [
        '$rootScope',
        '$scope',
        '$state',
        '$controller',
        '$http',
        'mailService',

        function($rootScope, $scope, $state, $controller, $http, mailService) {

            var ecoscore = $state;
            console.log(ecoscore);
            $scope.sendTheMail = function() {
                var emailUser = $("#userEmail").val();
                var firstName = $("#firstName").val();
                var lastName = $("#lastName").val();
                
                mailService.sendMandrill(lastName, firstName, emailUser);
                mailService.sendMailchimp(lastName, firstName, emailUser);

                    };
                }
    ]);
