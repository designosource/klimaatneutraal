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

            var displayInfo = function(){
                var target = $('#info');
                var button = $('#infoButton');

                if(target[0].style.display === "" || target[0].style.display === "none"){ // initial state = "" post-slideUp = "none"
                    target.slideDown();
                    button.html("Minder Informatie");
                }else{
                    target.slideUp();
                    button.html("Meer Informatie");
                }
            }


            // Bind scope functions
            $scope.selectOption = selectOption;
            $scope.deSelectOption = deSelectOption;
            $scope.publishOption = publishOption;
            $scope.displayInfo = displayInfo;

            init();
        }
    ]);
