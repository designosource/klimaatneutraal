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
                    skin: '1',
                    mood: '1'
                };

                updateImage();    
            };

            var changeSex = function(sex) {
                console.log(sex);
                $scope.character.sex = sex;

                updateImage();
            };

            var changeAge = function(age) {
                console.log(age);
                $scope.character.age = age;

                updateImage();
            };

            var changeSkin = function(skin) {
                console.log(skin);
                $scope.character.skin = skin;

                updateImage();
            };

            var updateImage = function() {
                $scope.image = $scope.character.sex + $scope.character.age + $scope.character.skin + $scope.character.mood + '.svg';
            };

            $scope.changeSex = changeSex;
            $scope.changeAge = changeAge;
            $scope.changeSkin = changeSkin;

            init();
        }
    ]);
