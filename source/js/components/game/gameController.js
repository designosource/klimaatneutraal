angular.module('klimaatneutraal.controllers')
    .controller('gameController', [
        '$rootScope',
        '$scope',
        '$uibModal',
        '$state',

        function($rootScope, $scope, $uibModal, $state) {

            var init = function() {
                console.log('gameController');

                $rootScope.game = {
                	'score': {
                		'public': 20,
                		'eco': 20,
                        'money': 20,
                	}
                };

                $rootScope.activePolicies = {
                    '1': [],
                    '2': [],
                    '3': [],
                };

                $rootScope.year = 1; // inital on 1

            };

            var openMenu = function (size) {

			    var menuModal = $uibModal.open({
			      	animation: true,
			      	templateUrl: 'js/components/modals/menuModal.html',
			      	controller: 'menuController',
			      	size: size,
			      	resolve: {}
			    });

			    menuModal.result.then(function(data) {
			      	console.log('approve');
			    }, function () {
			      	console.log('dismiss');
			    });

			};

            var goToNextYear = function() {
                $state.go('game.year', {'year': parseInt($rootScope.year) + 1})
            };

            var showReport = function() {

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

            };

            var removePolicy = function(key) {
                if($rootScope.activePolicies[$rootScope.year][key]) {

                    updateScore(-2, $rootScope.activePolicies[$rootScope.year][key]);

                    $rootScope.activePolicies[$rootScope.year].splice(key,1);
                }
            };

			$scope.openMenu = openMenu;
            $scope.goToNextYear = goToNextYear;
            $scope.removePolicy = removePolicy;
            $scope.showReport = showReport;

            init();
        }
    ]);
