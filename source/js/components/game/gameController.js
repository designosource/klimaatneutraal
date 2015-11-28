angular.module('klimaatneutraal.controllers')
    .controller('gameController', [
        '$scope',
        '$uibModal',

        function($scope, $uibModal) {

            var init = function() {
                console.log('gameController');

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
