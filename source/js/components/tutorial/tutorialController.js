angular.module('klimaatneutraal.controllers')
    .controller('TutorialController', [
        '$rootScope',
        '$scope',
        '$uibModal',
        '$state',
        '$controller',
        '$http',

        function($rootScope, $scope, $uibModal, $state, $controller, $http) {

            var init = function() {

                console.log('TutorialController loaded');

                var menuModal = $uibModal.open({
                    animation: true,
                    templateUrl: 'js/components/modals/tutorial/tutorialModal.html',
                    controller: 'tutorialModalController',
                    size: 200,
                    resolve: {}
                });

            };

            var nextTutorial = function nextTutorial(){
                console.log('nextTutorial');
            }

            $scope.nextTutorial = nextTutorial;

            init();
        }
    ]);
