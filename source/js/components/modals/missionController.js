angular.module('klimaatneutraal.controllers')
    .controller('missionController', [
        '$scope',
        '$uibModalInstance',
        'missions',

        function($scope, $uibModalInstance, missions) {
                        
            $scope.missions = missions;

            $scope.ok = function () {
                $uibModalInstance.close($scope.selected.item);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }
    ]);
