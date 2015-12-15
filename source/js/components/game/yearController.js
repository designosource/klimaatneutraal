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

            var init = function() {
                console.log('year1Controller loaded');
                $scope.year = $stateParams.year;
            };

            var openCategory = function(category) {

                var menuModal = $uibModal.open({
                    animation: true,
                    templateUrl: 'js/components/modals/policyModal.html',
                    controller: 'policyController',
                    size: 'lm',
                    resolve: {
                        policies: function () {
                            return policies.data[category];
                        }
                    }
                });

                menuModal.result.then(function(option) {

                    $scope.activePolicies.push(option);

                    var factor = 2;

                    $rootScope.game.score.eco += (option.eco * factor);
                    $rootScope.game.score.public += (option.public * factor);
                    $rootScope.game.money += (option.money * factor);

                    console.log($scope.activePolicies);

                }, function () {
                    console.log('dismiss');
                });

            };

            var showReport = function() {

                console.log('test');

                var menuModal = $uibModal.open({
                    animation: true,
                    templateUrl: 'js/components/modals/reportModal.html',
                    controller: 'reportController',
                    size: 'lm',
                    resolve: {
                        currentYear: function() {
                            return parseInt($scope.year) + 1;
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
