angular.module('klimaatneutraal.controllers')
    .controller('gameController', [
        '$rootScope',
        '$scope',
        '$uibModal',
        '$state',
        '$stateParams',
        'soundService',
        '$controller',

        function($rootScope, $scope, $uibModal, $state, $stateParams, soundService,$controller) {
            var IDLE_TIMEOUT = 120; //seconds
            var _idleSecondsTimer = null;
            var _idleSecondsCounter = 0;
            var menuModal;
            var policyModal;
            var reportModal;

            document.onclick = function() {
                _idleSecondsCounter = 0;
            };

            document.onmousemove = function() {
                _idleSecondsCounter = 0;
            };

            document.onkeypress = function() {
                _idleSecondsCounter = 0;
            };

            _idleSecondsTimer = window.setInterval(CheckIdleTime, 1000);

            function CheckIdleTime() {
                 _idleSecondsCounter++;
                 
                 //console.log((IDLE_TIMEOUT - _idleSecondsCounter) + "");

                if (_idleSecondsCounter >= IDLE_TIMEOUT) {

                    if(menuModal){
                        menuModal.close();
                    }

                    _idleSecondsCounter = 0;
                    openMenu();
                }
            }

            var init = function() {
                console.log('gameController');

                $rootScope.game = {
                	'score': {
                		'public': 20,
                		'eco': 20,
                        'money': 60,
                	}
                };

                $rootScope.activePolicies = {
                    '0': [],
                    '1': [],
                    '2': [],
                    '3': [],
                };

                $rootScope.reps = 0;
                
                $rootScope.year = $stateParams.year; // inital on 1

                $rootScope.screenOptions = [1,2,3,4,5,6];

                if($rootScope.initialYear === undefined){
                    // define the initial year to determine amount of repeats till game is over
                    // 0 or 1 = tutorial or play
                    // used in gameController.showReport()
                    $rootScope.initialYear = $stateParams.year;
                }

            };

            var openMenu = function (size) {
                soundService.defaultClick.play();
			    menuModal = $uibModal.open({
			      	animation: true,
			      	templateUrl: 'js/components/modals/menuModal.html',
			      	controller: 'menuController',
			      	size: "sm",
			      	resolve: {}
			    });

			    menuModal.result.then(function(data) {
			      	console.log('approve');
			    }, function () {
			      	console.log('dismiss');
			    });

			};


            var goToNextYear = function() {
                soundService.confirm.play();
                $state.go('game.year', {'year': parseInt($rootScope.year) + 1})
            };

            var showReport = function() {
                soundService.confirm.play();
                console.log($rootScope.year, parseInt($rootScope.initialYear) + 2)

                if($rootScope.year < parseInt($rootScope.initialYear) + 2) {
                    var menuModal = $uibModal.open({
                        animation: true,
                        templateUrl: 'js/components/modals/reportModal.html',
                        controller: 'reportController',
                        size: 'lg',
                        resolve: {
                            activePolicies: function() {
                                return $rootScope.activePolicies[$rootScope.year];
                            },
                            year: function() {
                                return $rootScope.year;
                            }
                        }
                    });

                    menuModal.result.then(function() {

                    goToNextYear();

                    }, function () {
                        console.log('dismiss');
                    });
                }
                else {
                    var endScore = $rootScope.game.score;
                    $state.go('endGame', {score: endScore});
                    console.info('het spel is gedaan!');
                }
            };

            var updateScore = function(factor, option) {
                $rootScope.game.score.eco += (option.results.year1.eco * factor);
                $rootScope.game.score.public += (option.results.year1.public * factor);
                $rootScope.game.score.money += (option.results.year1.money * factor);
            }

            var removePolicy = function(key) {
                soundService.cancelBack.play();
                if($rootScope.activePolicies[$rootScope.year][key]) {

                    updateScore(-2, $rootScope.activePolicies[$rootScope.year][key]);

                    $rootScope.activePolicies[$rootScope.year].splice(key,1);
                }
            };

            var goBack = function() {
                $state.go('game.year', {year: $rootScope.year - 1});
            };

			$scope.openMenu = openMenu;
            $scope.goToNextYear = goToNextYear;
            $scope.removePolicy = removePolicy;
            $scope.showReport = showReport;
            $scope.goBack = goBack;

            init();
        }
    ]);
