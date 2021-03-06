angular.module('klimaatneutraal')
    .config([

        '$urlRouterProvider',
        '$urlMatcherFactoryProvider',
        '$locationProvider',
        '$stateProvider',

        function($urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, $stateProvider) {

            // For any unmatched url:redirect to home
            $urlRouterProvider.otherwise('/');
            $urlMatcherFactoryProvider.strictMode(false);

            // Use the HTML5 History API
            $locationProvider.html5Mode(false);

            // States
            $stateProvider
            .state('startGame', {
                url: '/',
                views: {
                    '': {
                        templateUrl: 'js/components/start/start.html',
                        controller: 'startGameController'
                    }
                }
            })

            .state('character', {
                url: '/character',
                views: {
                    '': {
                        templateUrl: 'js/components/character/character.html',
                        controller: 'characterController'
                    }
                }
            })

            .state('endGame', {
                url: '/end',
                params: {
                 score: null
               },
                views: {
                    '': {
                        templateUrl: 'js/components/end/end.html',
                        controller: 'endGameController'
                    }
                }
            })

            .state('endRapport', {
                url: '/endRapport',
                params: {
                 userperc: {eco1: "50",
                    eco2: "50",
                    eco3: "50",
                    eco4: "50",
                    pub1: "50",
                    pub2: "50",
                    pub3: "50",
                    pub4: "50",
                    money1: "50",
                    money2: "50",
                    money3: "50",
                    money4: "50",}
                },
                views: {
                    '': {
                        templateUrl: 'js/components/end/endRapport.html',
                        controller: 'endRapportController'
                    }
                }
            })

            .state('game', {
                url: '/game', 
                views: {
                    '': {
                        templateUrl: 'js/components/game/game.html',
                        controller: 'gameController'
                    }
                },
                resolve: {
                    policies: ['policyService', function(policyService) {
                        return policyService.getAllPolicies();
                    }]
                }
            })

            .state("game.menu", {
                url: "/menu",
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: "js/components/modals/menuModal.html",
                        resolve: {
                            item: function() {
                                return ['test', '1234'];
                            }
                        },
                        controller: 'menuController'
                    }).result.finally(function() {
                        $state.go('^');
                    });
                }]
            })

            .state('game.year', {
                url: '/year/{year}',
                onEnter: ['$stateParams', '$state', function($stateParams, $state) {
                    if($stateParams.year == 0){
                        $stateParams.tutorialBoolean = true;
                    }else{
                        $stateParams.tutorialBoolean = false;
                    }
                }],
                views: {
                    '': {
                        templateUrl: 'js/components/game/year.html',
                        controller: 'yearController'
                    }
                }
            })

        }
    ]);
