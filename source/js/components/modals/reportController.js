angular.module('klimaatneutraal.controllers')
    .controller('reportController', [
        '$scope',
        '$state',
        '$uibModalInstance',
        'activePolicies',

        function($scope, $state, $uibModalInstance, activePolicies) {

            var init = function() {

            };

            var goToNextYear = function() {
                $uibModalInstance.close();
            };

            console.log(activePolicies);

            $scope.activePolicies = activePolicies;
            $scope.goToNextYear = goToNextYear;

            init();
        }
    ]);
