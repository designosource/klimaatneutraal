angular.module('klimaatneutraal.controllers')
    .controller('endRapportController', [
        '$rootScope',
        '$scope',
        '$state',
        '$controller',
        '$http',
        'soundService',

        function($rootScope, $scope, $state, $controller, $http, soundService) {
            var userScore = $state.params.userperc;
            console.log(userScore);
        
            var ecouser = parseInt(userScore.eco1);
            var ecototal = userScore.eco2;
            var pubuser = parseInt(userScore.pub1);
            var pubtotal = userScore.pub2;
            var moneyuser = parseInt(userScore.money1);
            var moneytotal = userScore.money2;
            var mechelenEco = 66;

            $scope.ecoUserResult = ecouser;
            $scope.pubUserResult = pubuser;
            $scope.moneyUserResult = moneyuser;
            
            if(ecouser > mechelenEco){
                $scope.twitterShare = "meer";
            }
            else {
                $scope.twitterShare = "minder";
            }

            $scope.setEcoTotal= {
                "float" : "left",
                "background-color" : "#424242",
                "width": ecototal + "%",
                "height": 30 + "px",
            }

            $scope.setEcoUser= {
                "float" : "left",
                "background-color" : "#89C73E",
                "width": ecouser + "%",
                "height": 30 + "px",
            }

            $scope.setPubTotal= {
                "float" : "left",
                "background-color" : "#424242",
                "width": pubtotal + "%",
                "height": 30 + "px",
            }

            $scope.setPubUser= {
                "float" : "left",
                "background-color" : "#89C73E",
                "width": pubuser + "%",
                "height": 30 + "px",
            }

            $scope.setMoneyTotal= {
                "float" : "left",
                "background-color" : "#424242",
                "width": moneytotal + "%",
                "height": 30 + "px",
            }

            $scope.setMoneyUser= {
                "float" : "left",
                "background-color" : "#89C73E",
                "width": moneyuser + "%",
                "height": 30 + "px",
            }
            
            
            }
    ]);
