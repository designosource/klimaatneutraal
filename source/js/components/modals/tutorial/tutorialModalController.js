angular.module('klimaatneutraal.controllers')
    .controller('tutorialModalController', [
        '$scope',
        '$uibModalInstance',
        'tutorialModalController',

        function($scope, $uibModalInstance, tutorialModalController) {
                        
            var init = function() {
                console.log('tutorialModalController loaded');

                $scope.tutorialModalController = tutorialModalController;
            };

            var nextTutorial = function nextTutorial(){
                console.log('nextTutorial');
            }

            $scope.nextTutorial = nextTutorial;

            init();

        }
    ]);
