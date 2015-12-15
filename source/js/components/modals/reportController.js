angular.module('klimaatneutraal.controllers')
    .controller('reportController', [
        '$scope',
        '$state',
        '$uibModalInstance',

        function($scope, $state, $uibModalInstance) {

            console.log('reportController');

            var goToNextYear = function() {
                $uibModalInstance.close();
            };

            $scope.goToNextYear = goToNextYear;
        }
    ]);
