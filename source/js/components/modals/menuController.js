angular.module('klimaatneutraal.controllers')
    .controller('menuController', [
        '$scope',
        '$uibModalInstance',

        function($scope, $uibModalInstance) {
                        
    

            $scope.ok = function () {
                $uibModalInstance.close($scope.selected.item);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }
    ]);
