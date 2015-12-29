angular.module('klimaatneutraal.controllers').filter('range', function() {
	return function(input, total) {
		total = Math.abs(parseInt(total));

		for (var i=0; i<total; i++) {
		  input.push(i);
		}

		return input;
	};
});

angular.module('klimaatneutraal.controllers').filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    };
});