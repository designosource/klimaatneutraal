angular.module('klimaatneutraal.controllers')
    .controller('policyController', [
        '$scope',
        '$state',
        '$uibModalInstance',
        'policies',

        function($scope, $state, $uibModalInstance, policies) {

            var init = function() {
                console.log('policiesController loaded');

                $scope.policies = policies;
        
            };

            var selectOption = function(option) {
                console.log(option);
                $scope.option = option;
            }

            var deSelectOption = function() {
                $scope.option = null;
            }

            var publishOption = function(option) {
                $uibModalInstance.close(option);
            }


            // Bind scope functions
            $scope.selectOption = selectOption;
            $scope.deSelectOption = deSelectOption;
            $scope.publishOption = publishOption;

            init();
        }
    ]);
