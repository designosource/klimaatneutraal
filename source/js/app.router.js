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

            .state('startTutorial', {
                url: '/tutorial',
                views: {
                    '': {
                        templateUrl: 'js/components/tutorial/start.html',
                        controller: 'startTutorialController'
                    }
                }
            })
            .state('endGame', {
                url: '/end',
                views: {
                    '': {
                        templateUrl: 'js/components/end/end.html',
                        controller: 'endGameController'
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
                }
            })

            .state('game.year', {
                url: '/year/{year}',
                views: {
                    '': {
                        templateUrl: 'js/components/game/year.html',
                        controller: 'yearController'
                    }
                }
            });

        }
    ]);
