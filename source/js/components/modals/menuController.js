angular.module('klimaatneutraal.controllers')
    .controller('menuController', [
        '$scope',
        '$uibModalInstance',
        'soundService',

        function($scope, $uibModalInstance, soundService) {
                        
    

            $scope.close = function () {
                console.log('close');
                soundService.defaultClick.play();
                $uibModalInstance.close();
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }
    ]);
