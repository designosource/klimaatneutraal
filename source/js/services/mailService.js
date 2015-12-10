angular.module('klimaatneutraal.services').service("mailService",[
	'$http',

	function($http){
		var emailNeutraal = 'glennvanhaute@gmail.com';
	 	var mailchimpKey='33b98fb66515f34a2391ca79edb49851-us12';
	 	var mandrillKey='NJR9rKU89OzZDcAKt7izMw';

	    var sendMandrill = function(name, firstName, email){
	      	$http.post('https://mandrillapp.com/api/1.0//messages/send.json', {
	            'key': mandrillKey,
	            'message': {
	              'html': 'je hebt goed gescoord',
	              'text': 'resp',
	              'subject': 'Resultaat klimaatneutraal',
	              'from_email': emailNeutraal,
	              'from_name': 'klimaatneutraal',
	              'to': [
	              {
	                'email': email,
	                'name': name,
	                'type': 'to'
	              }
	              ],
	              'headers': {
	                'Reply-To': emailNeutraal
	              }
	            }

	          });
	    };


      var sendMailchimp = function(name, firstName, email){
	      	$http.post('https://us12.api.mailchimp.com/2.0/lists/subscribe.json?apikey='+mailchimpKey+'&id=cb553f7b01&email[email]='+email+'&merge_vars[FNAME]='+firstName+'&merge_vars[LNAME]='+name+'&double_optin=false&send_welcome=false');

/*	      	$http.post('https://us12.api.mailchimp.com/3.0/lists/cb553f7b01/members', {
	      		"key": mailchimpKey,
			    "email_address": email,
			    "status": "subscribed",
			    "merge_fields": {
			        "FNAME": "firstName",
			        "LNAME": "name"
			    }
	        });*/
      };

      return {
      	sendMandrill:sendMandrill,
      	sendMailchimp:sendMailchimp
      }

        
      return 
    
}]);