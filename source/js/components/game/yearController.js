angular.module('klimaatneutraal.controllers')
    .controller('yearController', [
        '$rootScope',
        '$scope',
        '$state',
        '$controller',
        '$http',
        'mailService',
        '$uibModal',

        function($rootScope, $scope, $state, $controller, $http, mailService, $uibModal) {
            
            var init = function() {
                console.log('year1Controller loaded');
                console.log(mailService);

            };

            var openComponent = function(component) {

                var missions = {
                    'house': [
                        'house Missie 1',
                        'house Missie 2',
                        'house Missie 3',
                    ],
                    'windTurbine': [
                        'windTurbine Missie 1',
                        'windTurbine Missie 2',
                        'windTurbine Missie 3',
                    ]
                }

                var menuModal = $uibModal.open({
                    animation: true,
                    templateUrl: 'js/components/modals/missionModal.html',
                    controller: 'missionController',
                    size: 'lm',
                    resolve: {
                        missions: function () {
                          return missions[component];
                        }
                    }
                });

                menuModal.result.then(function(data) {
                    console.log('approve');
                }, function () {
                    console.log('dismiss');
                });

            };

            $scope.openComponent = openComponent;

            init();
            
            $scope.sendEmail = function() {
                console.log("clicked");
                mailService.sendRapport(/*send*/);

            };
        }
    ]);
