angular.module('klimaatneutraal').config([
    'cfpLoadingBarProvider',

    function(cfpLoadingBarProvider) {
    	cfpLoadingBarProvider.includeSpinner = false;
    }

]);
