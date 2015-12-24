angular.module('klimaatneutraal.controllers')
    .controller('yearController', [
        '$rootScope',
        '$scope',
        '$state',
        '$stateParams',
        '$uibModal',
        'mailService',
        'policies',

        function($rootScope, $scope, $state, $stateParams, $uibModal, mailService, policies) {

            var policiesData = {};
            var chunkPolicies = {};

            var init = function() {
                $rootScope.year = $stateParams.year;

                console.log('year ' + $rootScope.year + ' is loaded');

                policiesData = policies.data;

                console.log('Active perks: ');
                console.log($rootScope.activePolicies);

                $rootScope.screenOptions = _.shuffle($rootScope.screenOptions);
                $scope.renderScreen =  $rootScope.screenOptions[0];
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
                }
                else {

                    // We verdelen de opties voor de gekozen categorie in groepjes van 3
                    chunkPolicies[category] = _.chunk(_.values(policiesData[category]), 3);

                    // Open de policy modal
                    var menuModal = $uibModal.open({
                        animation: true,
                        templateUrl: 'js/components/modals/policyModal.html',
                        controller: 'policyController',
                        size: 'md',
                        resolve: {
                            policies: function () {
                                return chunkPolicies[category][$rootScope.year - 1];
                            }
                        }
                    });

                    // Er is een result van de modal
                    menuModal.result.then(function(option) {

                        // We disablen de gekozen optie
                        policiesData[category][option.id].disabled = true;

                        // Voeg de optie toe aan de actieve policies
                        $rootScope.activePolicies[$rootScope.year].push(policiesData[category][option.id]);

                        // Bereken de stijging / daling van de gekozen maatregel

                        updateScore(2, option);

                    }, function () {
                        console.log('dismiss');
                    });
                }
            };

            $scope.openCategory = openCategory;

            init();
        }
    ]);
