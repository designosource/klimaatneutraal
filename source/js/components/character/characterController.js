angular.module('klimaatneutraal.controllers')
    .controller('characterController', [
        '$rootScope',
        '$scope',
        '$uibModal',

        function($rootScope, $scope, $uibModal) {

            var init = function() {
                console.log('characterController');
                $scope.character = {
                    sex: '1',
                    age: '1',
                    skin: '1'
                };
            };

            var changeSex = function(sex) {
                console.log(sex);
                $scope.character.sex = sex;
            };

            var changeAge = function(age) {
                console.log(age);
                $scope.character.age = age;
            };

            var changeSkin = function(skin) {
                console.log(skin);
                $scope.character.skin = skin;
            };

            $scope.changeSex = changeSex;
            $scope.changeAge = changeAge;
            $scope.changeSkin = changeSkin;

            init();
        }
    ]);
