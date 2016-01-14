angular.module('klimaatneutraal.services').service("soundService",[
	'ngAudio',

	function(ngAudio) {
    	
    	return {
    		"defaultClick": ngAudio.load("sounds/default_click.wav"),
    		"defaultAlt": ngAudio.load("sounds/default_alt.wav"),
    		"cancelBack": ngAudio.load("sounds/cancel_back.wav"),
    		"confirm": ngAudio.load("sounds/confirm.wav"),
    	};
	}
]);