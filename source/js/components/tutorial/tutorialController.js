angular.module('klimaatneutraal.controllers')
    .controller('tutorialController', [
        '$rootScope',
        '$scope',
        '$uibModal',
        '$state',
        '$stateParams',

        function($rootScope, $scope, $uibModal, $state) {

            var init = function() {

                console.log('tutorialController loaded');

                var menuModal = $uibModal.open({
                    animation: true,
                    templateUrl: 'js/components/modals/tutorial/modal_0.html',
                    controller: 'startTutorialController',
                    backdropClass: 'modal_0',
                    // windowClass: 'ratio-wrapper',
                    size: 200,
                    resolve: {}
                });

            };

            $rootScope.tutorialCounter = 0;

            init();
        }
    ]);
