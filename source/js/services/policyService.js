angular.module('klimaatneutraal.services').service("policyService",[
	'$http',

	function($http) {
		
		var getAllPolicies = function() {
			return $http.get('js/data/policies.json');
		};
    	
    	return {
    		getAllPolicies: getAllPolicies
    	};
	}
]);