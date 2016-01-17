angular.module('klimaatneutraal.controllers')
    .controller('characterController', [
        '$rootScope',
        '$scope',
        '$uibModal',
        'soundService',
        'mailService',

        function($rootScope, $scope, $uibModal, soundService, mailService) {

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
                soundService.defaultClick.play();
                console.log(sex);
                $scope.character.sex = sex;

                updateImage();
            };

            var changeAge = function(age) {
                soundService.defaultClick.play();
                console.log(age);
                $scope.character.age = age;

                updateImage();
            };

            var changeSkin = function(skin) {
                soundService.defaultClick.play();
                console.log(skin);
                $scope.character.skin = skin;

                updateImage();
            };

            var updateImage = function() {
                $scope.image = $scope.character.sex + $scope.character.age + $scope.character.skin + $scope.character.mood + '.svg';
                getImage($scope.image);
            };

            var getImage = function (test){
                var ass = test;
                
            };
            $scope.sendCharacter = function() {
                    var character = $scope.image;
                    mailService.getCharacter(character);
                };
            $scope.playConfirmSound = function() {
                soundService.confirm.play();
            };
             

            $scope.changeSex = changeSex;
            $scope.changeAge = changeAge;
            $scope.changeSkin = changeSkin;

            init();
        }
    ]);
