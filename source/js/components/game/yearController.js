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
                console.log('year1Controller loaded');
                $scope.year = $stateParams.year;

                policiesData = policies.data;
            };

            var openCategory = function(category) {

                // Kijk of er al niet twee opties gekozen zijn.
                if($scope.activePolicies.length >= 2) {
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
                        size: 'lm',
                        resolve: {
                            policies: function () {
                                return chunkPolicies[category][$scope.year - 1];
                            }
                        }
                    });

                    // Er is een result van de modal
                    menuModal.result.then(function(option) {

                        // We disablen de gekozen optie
                        policiesData[category][option.id].disabled = true;

                        // Voeg de optie toe aan de actieve policies
                        $scope.activePolicies.push(policiesData[category][option.id]);

                        // Bereken de stijging / daling van de gekozen maatregel
                        var factor = 2;
                        $rootScope.game.score.eco += (option.eco * factor);
                        $rootScope.game.score.public += (option.public * factor);
                        $rootScope.game.money += (option.money * factor);

                    }, function () {
                        console.log('dismiss');
                    });
                }
            };

            var showReport = function() {

                var menuModal = $uibModal.open({
                    animation: true,
                    templateUrl: 'js/components/modals/reportModal.html',
                    controller: 'reportController',
                    size: 'lg',
                    resolve: {
                        activePolicies: function() {
                            return $scope.activePolicies;
                        }
                    }
                });

                menuModal.result.then(function() {

                    goToNextYear();

                }, function () {
                    console.log('dismiss');
                });

            };

            var removePolicy = function(key) {
                if($scope.activePolicies[key]) {
                    $scope.activePolicies.splice(key,1);
                }
            };

            var goToNextYear = function() {
                $state.go('game.year', {'year': parseInt($scope.year) + 1})
            };

            $scope.activePolicies = [];
            $scope.openCategory = openCategory;
            $scope.goToNextYear = goToNextYear;
            $scope.removePolicy = removePolicy;
            $scope.showReport = showReport;

            init();
        }
    ]);
