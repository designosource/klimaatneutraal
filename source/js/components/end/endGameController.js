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
            console.log (ecoscore);
            var moneyScore = ecoscore.money;
            var publicScore = ecoscore.public;
            var ecoScore = ecoscore.eco;
            //SER - max variables for each subject
            var maxMoney = 65;
            var maxEco = 65;
            var maxPub = 59;
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
                var newPercentage = (perctageUser/3);
                return newPercentage;
                
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
            // CALCULATE FUNCTION FOR WIDTH USED IN MAIL
            function calculateWidth(e){
                var maxWidth = 360;
                var width = (360/100) * e;
                var naarstring =  width.toString()
                var end = naarstring.substring(0,3);
                var naarInt = parseInt(end);

                return naarInt;
            }
            // CALCULATE FUNCTION FOR TOTAL WIDTH USED IN MAIL
            function calculateWidthTotal(e){
                var widthMax = 360 - e;

                return widthMax;
            }
            // CALULATE WIDTH /3 (changes)
            function calculateWidthNew(){
                var percentageMoneyNew = (100 / maxMoney) * moneyScore;
                var endNew = percentageMoneyNew.toString();
                var perctageUserNew = endNew.substring(0,2);
        
                return perctageUserNew;
            }
            // FUNCTION WHEN THEY SUBMIT THE FORM
            $scope.sendTheMail = function() {
                //GET VALUES FROM THE USER
                var emailUser = $("#userEmail").val();
                var firstName = $("#firstName").val();
                var lastName = $("#lastName").val();
                var nieuwsbrief = $("#nieuwsbrief").val();
               
                //MONEY - calculations for divs
                var moneyUser = calculateMoney();
                var moneyTotal =  total(moneyUser);
                var moneyWidth = calculateWidth(moneyUser);
                var moneywidthtotal = calculateWidthTotal (moneyWidth);
                var moneyScoreNew = calculateWidthNew ();
                //ECO - calculations for divs
                var ecoUser = calculateEco();
                var ecoTotal =  total(ecoUser);
                var ecoWidth = calculateWidth(ecoUser);
                var ecowidthtotal = calculateWidthTotal (ecoWidth);
                //PUBLIC - Calculations for divs
                var pubUser = calculatePub();
                var pubTotal =  total(pubUser);
                var pubWidth = calculateWidth(pubUser);
                var pubwidthtotal = calculateWidthTotal (pubWidth);
               
                //MONEY - put html in variable
                var widthUserMoney = '"width:'+moneyUser+'%;height:30px; background-color:#89C73E;float:left;"';
                var widthMaxMoney = '"width:'+moneyTotal+'%;height:30px; background-color:#424242; float:left;"';
                //MONEY - Variable to send to Mandrill
                var moneyMandrill ="<div style="+widthUserMoney+"></div><div style="+widthMaxMoney+"></div>"
               
                //ECO - put html in variable
                var widthUserEco = '"width:'+ecoUser+'%;height:30px; background-color:#89C73E;float:left;"';
                var widthMaxEco = '"width:'+ecoTotal+'%;height:30px; background-color:#424242; float:left;"';
                //ECO - Variable to send to Mandrill
                var ecoMandrill ="<div style="+widthUserEco+"></div><div style="+widthMaxEco+"></div>"
                
                //PUBLIC - put html in variable
                var widthUserPub = '"width:'+pubUser+'%;height:30px; background-color:#89C73E;float:left;"';
                var widthMaxPub = '"width:'+pubTotal+'%;height:30px; background-color:#424242; float:left;"';
                //PUBLIC - Variable to send to Mandrill
                var publicMandrill ="<div style="+widthUserPub+"></div><div style="+widthMaxPub+"></div>";
                

                // (very important) Variable object of all the scores and widths
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
                    money5: moneyScoreNew,

                };

                // SEND ALL THE VARIABLE TO THE MAIL SERVICE (location: services/mailService.js)
                mailService.sendMandrill(lastName, firstName, emailUser, moneyMandrill, ecoMandrill, publicMandrill, endRapportscore, meerMinder);
                mailService.sendMailchimp(lastName, firstName, emailUser);
               
               
                    if ($('#nieuwsbrief').is(":checked"))
                    {
                        mailService.sendMailchimpNieuwsbrief(lastName, firstName, emailUser);
                    };
                
                
                

                };
                }
    ]);
