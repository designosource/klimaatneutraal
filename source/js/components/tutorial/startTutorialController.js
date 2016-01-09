angular.module('klimaatneutraal.controllers')
    .controller('startTutorialController', [
        '$rootScope',
        '$scope',
        '$state',
        '$controller',
        '$http',
        '$uibModal',
        '$uibModalInstance',

        function($rootScope, $scope, $state, $controller, $http, $uibModal, $uibModalInstance) {

            // initialize counter
            var i = $rootScope.tutorialCounter;
            // debug
            console.log(i);

            var init = function() {
                console.log('startTutorialController loaded');
                
            };

            var open = function(x){
                // close current
                $uibModalInstance.close();

                // dynamically open next modal
                var menuModal = $uibModal.open({
                    animation: true,
                    templateUrl: 'js/components/modals/tutorial/modal_'+x+'.html',
                    controller: 'startTutorialController',
                    backdropClass: 'modal_'+x+'',
                    size: 200,
                    resolve: {}
                });

                // update counter
                $rootScope.tutorialCounter = x;
            }

            $scope.next = function(){

                // raise counter
                i++;
                // call generic opener & raise counter
                open(i);
                
            }

            $scope.previous = function(){

                // raise counter
                i--;
                // call generic opener & raise counter
                open(i);
                
            }

            $scope.choose = function(){
                $uibModalInstance.close();
            }


            init();
        }
    ]);
