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
            var meerMinder ={};

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

            function calculateWidth(e){
                var maxWidth = 360;
                var width = (360/100) * e;
                var naarstring =  width.toString()
                var end = naarstring.substring(0,3);
                var naarInt = parseInt(end);

                return naarInt;
            }

            function calculateWidthTotal(e){
                var widthMax = 360 - e;

                return widthMax;
            }
            var testtable = 
                '<style type="text/css">.tg td{font-family:Arial, sans-serif;font-size:14px;padding:5px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:5px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}.tg .tg-yw4l{vertical-align:top}</style><table class="tg" style="border-collapse:collapse;border-spacing:0;width: 960px;"><tr><th class="tg-yw4l" colspan="3">Jouw Score</th><th class="tg-yw4l" colspan="3">Score van Mechelen</th></tr><tr><td class="tg-yw4l" style="width:5%"><img src="https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/12d15ca1-0328-4bf0-85ce-da2a421415ac.gif" alt="" style="width:50%; padding-left:5px;"></td><td class="tg-yw4l" style="width:337px;background-color:#89C73E;"></td><td class="tg-yw4l" style="width:98px; background-color:#424242;"></td><td class="tg-yw4l" style="width:25%;background-color:#89C73E;"></td><td class="tg-yw4l" style="width:25%; background-color:#424242;"></td></tr></table>';



            $scope.sendTheMail = function() {
                var emailUser = $("#userEmail").val();
                var firstName = $("#firstName").val();
                var lastName = $("#lastName").val();
                //MONEY - calculations
                var moneyUser = calculateMoney();
                var moneyTotal =  total(moneyUser);
                var moneyWidth = calculateWidth(moneyUser);
                var moneywidthtotal = calculateWidthTotal (moneyWidth);
                //ECO - calculations
                var ecoUser = calculateEco();
                var ecoTotal =  total(ecoUser);
                var ecoWidth = calculateWidth(ecoUser);
                var ecowidthtotal = calculateWidthTotal (ecoWidth);
                //PUBLIC - Calculations
                var pubUser = calculatePub();
                var pubTotal =  total(pubUser);
                var pubWidth = calculateWidth(pubUser);
                var pubwidthtotal = calculateWidthTotal (pubWidth);
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
                var publicMandrill ="<div style="+widthUserPub+"></div><div style="+widthMaxPub+"></div>";
                //MEER MINDER
                /*var meerMinder = "Als klimaatburgemeester behaal jij een besparing van "+resultMeerMinder+" dan 20%. Ontvang nu tot 5000 euro subsidie om jouw buurt ook echt klimaatneutraal te maken. 
                
                Geen inspiratie? Kijk naar onderstaande tips en bouw mee aan jouw klimaatneutraal Mechelen.";*/
                
                var endRapportscore = {
                    eco1: ecoUser,
                    eco2: ecoTotal,
                    eco3: ecoWidth,
                    eco4: ecowidthtotal,
                    pub1: pubUser,
                    pub2: pubTotal,
                    pub3: pubWidth,
                    pub4: pubwidthtotal,
                    money1: moneyUser,
                    money2: moneyTotal,
                    money3: moneyWidth,
                    money4: moneywidthtotal,

                };

                mailService.sendMandrill(lastName, firstName, emailUser, moneyMandrill, ecoMandrill, publicMandrill, endRapportscore,testtable);
                mailService.sendMailchimp(lastName, firstName, emailUser);
                
                
                

                };
                }
    ]);
