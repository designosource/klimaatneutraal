angular.module('klimaatneutraal.controllers')
    .controller('yearController', [
        '$rootScope',
        '$scope',
        '$state',
        '$stateParams',
        '$timeout',
        '$uibModal',
        'soundService',
        'mailService',
        'policies',

        function($rootScope, $scope, $state, $stateParams, $timeout, $uibModal, soundService, mailService, policies) {

            var policiesData = {};
            var chunkPolicies = {};
            var sounds = {};

            var init = function() {
                $rootScope.year = $stateParams.year;
                
                $scope.tutorial = $stateParams.tutorialBoolean;

                if($scope.tutorial || $rootScope.didTutorial){
                    $rootScope.initialYear = 0;
                }else{
                    $rootScope.initialYear = 1;
                }

                // DEBUG
                console.log('initialYear is: ' + $rootScope.initialYear);

                console.log('year ' + $rootScope.year + ' is loaded');

                policiesData = policies.data;

                console.log('Active perks: ');
                console.log($rootScope.activePolicies);

                $rootScope.screenOptions = _.shuffle($rootScope.screenOptions);
                $scope.renderScreen =  $rootScope.screenOptions[0];
                //$scope.renderScreen =  1; // for testing
                //$scope.renderScreen =  $stateParams.year; // for testing
                $rootScope.screenOptions.splice(0,1); // remove option from array
            };

            var updateScore = function(factor, option) {
                $rootScope.game.score.eco += (option.results.year1.eco * factor);
                $rootScope.game.score.public += (option.results.year1.public * factor);
                $rootScope.game.score.money += (option.results.year1.money * factor);
            }

            var openCategory = function(category) {

                // Kijk of er al niet twee opties gekozen zijn.
                if($rootScope.activePolicies[$rootScope.year].length >= 2) {
                    console.error('Er mogen maximum twee opties gekozen worden!'); // Zorg dat dit ook nog in de ui komt!
                    soundService.cancelBack.play();
                }
                else {

                    soundService.defaultClick.play();

                    // We verdelen de opties voor de gekozen categorie in groepjes van 3
                    chunkPolicies[category] = _.chunk(_.values(policiesData[category]), 3);

                    // Open de policy modal
                    var menuModal = $uibModal.open({
                        animation: true,
                        templateUrl: 'js/components/modals/policyModal.html',
                        controller: 'policyController',
                        size: 'lg',
                        resolve: {
                            policies: function () {

                                if($scope.tutorial){
                                    var pols = chunkPolicies[category][$rootScope.year];
                                    $rootScope.didTutorial = true;
                                }else{
                                    if($rootScope.didTutorial){
                                        var pols = chunkPolicies[category][$rootScope.year];
                                    }else{
                                        var pols = chunkPolicies[category][$rootScope.year - 1];
                                    }
                                }
                                
                                var active = $rootScope.activePolicies[$rootScope.year];
                                var index = -1;

                                // tutorial merge note
                                /* De if zonder de for gaf een merge conflict, ik heb de for in de
                                non-tutorial condition gestoken. Redelijk educated guess ma toch, could be
                                errors */

                                // deze for ipv return chunkPolicies[category][$rootScope.year-1];
                                for(var i = 0; i < pols.length; i += 1) {
                                    index = _.findIndex(active, function(a) {
                                        return a.id == pols[i].id;
                                    });

                                    if(index >= 0) {
                                        console.log('true');
                                        pols[i].disabled = true;
                                    }
                                    else {
                                        console.log('false');
                                        pols[i].disabled = false;
                                    }
                                    
                                }

                                pols.category = category;

                                return pols;

                            }
                        }
                    });

                    // Er is een result van de modal
                    menuModal.result.then(function(option) {

                        // Show animation
                        $scope.actionAnimation = option.id;

                        // Disable na 3 seconden
                        $timeout(function() {
                            $scope.actionAnimation = "";
                        },3000);

                        // We disablen de gekozen optie - OLD
                        //policiesData[category][option.id].disabled = true;

                        // Voeg de optie toe aan de actieve policies
                        $rootScope.activePolicies[$rootScope.year].push(policiesData[category][option.id]);

                        console.log($rootScope.activePolicies[$rootScope.year]);

                        // triggers for tutorial
                        // assumption: this code will not be reached more than twice
                        $timeout(function(){
                            if($scope.tutorial && $rootScope.activePolicies[$rootScope.year].length === 1){
                                $rootScope.openTutorialModal(6);
                            }else if($scope.tutorial){
                                $rootScope.openTutorialModal(7);
                            }
                        },3000);

                        // Bereken de stijging / daling van de gekozen maatregel

                        updateScore(2, option);

                    }, function () {
                        console.log('dismiss');
                    });
                }
            };

            $scope.openCategory = openCategory;
            $scope.tutorial = false;

            init();
        }
    ]);
