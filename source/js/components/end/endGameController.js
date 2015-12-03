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
            };

            init();
            
            $scope.sendTheMail = function() {
                console.log("clicked");
                mailService.sendRapport(/*send*/);

                var m = new mandrill.Mandrill('NJR9rKU89OzZDcAKt7izMw');
                // Collect Inputs
                var email = document.getElementById('userEmail').value;
                var name = document.getElementById('userName').value;
                var subject = document.getElementById('userSubject').value;
                var message = document.getElementById('userMessage').value;
                var emailBody = "From: " + name + "<br><br>" +  + "Subject: " + subject + "<br><br>" + message;

                var params = {

                    "message": {
                        "from_email":email,
                        "to":[{"email":"glennvanhaute@gmail.com"}],
                        "subject": "New email from website",
                        "html": emailBody
                    }
                };

                m.messages.send(params);

                    };
                }
    ]);
