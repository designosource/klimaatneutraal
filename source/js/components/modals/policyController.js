angular.module('klimaatneutraal.controllers')
    .controller('policyController', [
        '$scope',
        '$state',
        '$uibModalInstance',
        'soundService',
        'policies',

        function($scope, $state, $uibModalInstance, soundService, policies) {

            var init = function() {
                console.log('policiesController loaded');

                $scope.policies = policies;
        
            };

            var selectOption = function(option) {
                soundService.defaultClick.play();
                $scope.option = option;
            }

            var deSelectOption = function() {
                soundService.cancelBack.play();
                $scope.option = null;
            }

            var publishOption = function(option) {
                soundService.confirm.play();
                $uibModalInstance.close(option);
            }


            // Bind scope functions
            $scope.selectOption = selectOption;
            $scope.deSelectOption = deSelectOption;
            $scope.publishOption = publishOption;

            init();
        }
    ]);
