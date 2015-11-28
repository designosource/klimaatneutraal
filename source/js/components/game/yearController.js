angular.module('klimaatneutraal.controllers')
    .controller('yearController', [
        '$rootScope',
        '$scope',
        '$stateParams',
        '$uibModal',
        'mailService',

        function($rootScope, $scope, $stateParams, $uibModal, mailService) {
            
            var init = function() {
                console.log('year1Controller loaded');
                console.log(mailService);

                $scope.year = $stateParams.year;
            };

            var openComponent = function(component) {

                $rootScope.game.score.eco = 80;

                var missions = {
                    'house': [
                        'house Missie 1',
                        'house Missie 2',
                        'house Missie 3',
                    ],
                    'busstop': [
                        'busstop Missie 1',
                        'busstop Missie 2',
                        'busstop Missie 3',
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
