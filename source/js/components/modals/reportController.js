angular.module('klimaatneutraal.controllers')
    .controller('reportController', [
        '$scope',
        '$state',
        '$uibModalInstance',
        'activePolicies',
        'year',

        function($scope, $state, $uibModalInstance, activePolicies, year) {

            var init = function() {

            };

            var goToNextYear = function() {
                $uibModalInstance.close();
            };

            console.log(activePolicies);

            $scope.activePolicies = activePolicies;
            $scope.year = year;
            $scope.goToNextYear = goToNextYear;

            init();
        }
    ]);
