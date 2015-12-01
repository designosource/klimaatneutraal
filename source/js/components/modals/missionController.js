angular.module('klimaatneutraal.controllers')
    .controller('missionController', [
        '$scope',
        '$state',
        '$uibModalInstance',
        'mission',

        function($scope, $state, $uibModalInstance, mission) {
                        
            var init = function() {
                console.log('missionController loaded');
                $scope.mission = mission;
            };

            var selectOption = function(option) {
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
