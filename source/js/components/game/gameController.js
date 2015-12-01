angular.module('klimaatneutraal.controllers')
    .controller('gameController', [
        '$rootScope',
        '$scope',
        '$uibModal',

        function($rootScope, $scope, $uibModal) {

            var init = function() {
                console.log('gameController');

                $rootScope.game = {
                	'money': 50,
                	'score': {
                		'public': 50,
                		'eco': 50
                	}
                }

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

			$scope.openMenu = openMenu;

            init();
        }
    ]);
