angular.module('klimaatneutraal.controllers')
    .controller('endGameController', [
        '$rootScope',
        '$scope',
        '$state',
        '$controller',
        '$http',
        'mailService',

        function($rootScope, $scope, $state, $controller, $http, mailService) {
            //GET - Userscores
            var ecoscore = $state.params.score;
            var moneyScore = ecoscore.money;
            var publicScore = ecoscore.public;
            var ecoScore = ecoscore.eco;
            //SER - max variables for each subject
            var maxMoney = 62;
            var maxEco = 66;
            var maxPub = 48;

            //Calculate the second Div %
            function total(i){
                var perctageMax = 100 - i;

                return perctageMax;
            }

            // MONEY - Calculate first div %
            function calculateMoney(){
                var percentageMoney = (100 / maxMoney) * moneyScore;
                var end = percentageMoney.toString();
                var perctageUser = end.substring(0,2);
                return perctageUser;
                
            }

            // ECO - Calculate first div %
            function calculateEco(){
                var percentageEco = (100 / maxEco) * ecoScore;
                var end = percentageEco.toString();
                var perctageUser = end.substring(0,2);
                return perctageUser;
                
            }
             // PUB - Calculate first div %
            function calculatePub(){
                var percentagePub = (100 / maxPub) * publicScore;
                var end = percentagePub.toString();
                var perctageUser = end.substring(0,2);
                return perctageUser;
                
            }
            

            $scope.sendTheMail = function() {
                var emailUser = $("#userEmail").val();
                var firstName = $("#firstName").val();
                var lastName = $("#lastName").val();
                //MONEY - calculations
                var moneyUser = calculateMoney();
                var moneyTotal =  total(moneyUser);
                //ECO - calculations
                var ecoUser = calculateEco();
                var ecoTotal =  total(ecoUser);
                //PUBLIC - Calculations
                var pubUser = calculatePub();
                var pubTotal =  total(pubUser);
                //MONEY - put html in variable
                var widthUserMoney = '"width:'+moneyUser+'%;height:30px; background-color:#89C73E;float:left;"';
                var widthMaxMoney = '"width:'+moneyTotal+'%;height:30px; background-color:#424242; float:left;"';
                var moneyMandrill ="<div style="+widthUserMoney+"></div><div style="+widthMaxMoney+"></div>"
                //ECO - put html in variable
                var widthUserEco = '"width:'+ecoUser+'%;height:30px; background-color:#89C73E;float:left;"';
                var widthMaxEco = '"width:'+ecoTotal+'%;height:30px; background-color:#424242; float:left;"';
                var ecoMandrill ="<div style="+widthUserEco+"></div><div style="+widthMaxEco+"></div>"
                //PUBLIC - put html in variable
                var widthUserPub = '"width:'+pubUser+'%;height:30px; background-color:#89C73E;float:left;"';
                var widthMaxPub = '"width:'+pubTotal+'%;height:30px; background-color:#424242; float:left;"';
                var publicMandrill ="<div style="+widthUserPub+"></div><div style="+widthMaxPub+"></div>"
                //MEER MINDER
                /*var meerMinder = "Als klimaatburgemeester behaal jij een besparing van "+resultMeerMinder+" dan 20%. Ontvang nu tot 5000 euro subsidie om jouw buurt ook echt klimaatneutraal te maken. 

                Geen inspiratie? Kijk naar onderstaande tips en bouw mee aan jouw klimaatneutraal Mechelen.";*/
                var endRapportscore = {
                    eco1: ecoUser,
                    eco2: ecoTotal,
                    pub1: pubUser,
                    pub2: pubTotal,
                    money1: moneyUser,
                    money2: moneyTotal,

                };

                mailService.sendMandrill(lastName, firstName, emailUser, moneyMandrill, ecoMandrill, publicMandrill, endRapportscore);
                mailService.sendMailchimp(lastName, firstName, emailUser);
                
                
                

                };
                }
    ]);
