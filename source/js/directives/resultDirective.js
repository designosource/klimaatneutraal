angular.module('klimaatneutraal.directives').directive('resultDirective', [
    //'', 

    function () {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/resultDirective.html',
            replace: true,
            scope: {
                policy: "=",
            },
            link: function ($scope, element, attr) {
            }
        };
    }]);