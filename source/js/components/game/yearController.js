angular.module('klimaatneutraal.controllers')
    .controller('yearController', [
        '$rootScope',
        '$scope',
        '$state',
        '$stateParams',
        '$uibModal',
        'mailService',

        function($rootScope, $scope, $state, $stateParams, $uibModal, mailService) {
            
            var init = function() {
                console.log('year1Controller loaded');
                console.log(mailService);

                $scope.year = $stateParams.year;
            };

            var openComponent = function(component) {

                $rootScope.game.score.eco = 80;

                var missions = {
                    'house': {
                        'title': 'Warmte behoud',
                        'options': [
                            {
                                'title': 'DakIsolatiepremie',
                                'description': 'Ik ben Alain Vandam, een groepsmens. En als ik zo rond mij kijk, zie ik een groep toffe mensen en ik zal proberen mijn plaatske daarin te vinden maar dat zal wel lukken, dus wa mij betreft alles geven he!',
                                'money': 2,
                                'public': -3,
                                'eco': 3
                            },
                            {
                                'title': 'Groententuinpremie',
                                'description': 'Ik ben Alain Vandam, een groepsmens. En als ik zo rond mij kijk, zie ik een groep toffe mensen en ik zal proberen mijn plaatske daarin te vinden maar dat zal wel lukken, dus wa mij betreft alles geven he!',
                                'money': 2,
                                'public': 1,
                                'eco': 3
                            },
                            {
                                'title': 'Belastingen op uitstoost',
                                'description': 'Ik ben Alain Vandam, een groepsmens. En als ik zo rond mij kijk, zie ik een groep toffe mensen en ik zal proberen mijn plaatske daarin te vinden maar dat zal wel lukken, dus wa mij betreft alles geven he!',
                                'money': 2,
                                'public': 1,
                                'eco': 3
                            }
                           
                        ]
                    },
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
                        mission: function () {
                          return missions[component];
                        }
                    }
                });

                menuModal.result.then(function(option) {
                    console.log('approve');
                    console.log(option);
                    $state.go('game.year', {'year':2})
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
