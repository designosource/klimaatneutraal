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
                console.log(policies);
        
            };

            var selectOption = function(option) {
                $scope.option = option;
            }

            var deSelectOption = function() {
                $scope.option = null;
            }

            var publishOption = function(option) {
                option.disabled = true;
                $uibModalInstance.close(option);
            }


            // Bind scope functions
            $scope.selectOption = selectOption;
            $scope.deSelectOption = deSelectOption;
            $scope.publishOption = publishOption;

            init();
        }
    ]);
