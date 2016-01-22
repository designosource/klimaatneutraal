angular.module('klimaatneutraal.services').service("mailService",[
	'$http',
	'$state',


	function($http, $state){
		var emailNeutraal = 'duurzame.ontwikkeling@mechelen.be';
	 	var mailchimpKey='33b98fb66515f34a2391ca79edb49851-us12';
	 	var mandrillKey='NJR9rKU89OzZDcAKt7izMw';
	 	var MyCharacter = {}; 
	 	var getCharacter = function(character){
	 		MyCharacter.character = character;		
	 	};
	 	

	    var sendMandrill = function(name, firstName, email, moneyMandrill, ecoMandrill, publicMandrill, endRapportscore, testtable, meerMinder){
	    	var characterUser = MyCharacter.character;
	    	var sliced = characterUser.slice(0,-4);
	    	var mailchimpImages = {
	    		1111: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/de2bd8db-28e1-47b0-8a6e-6382bdba36aa.gif",
	    		1112: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/5fc2619d-715c-41d8-a776-fbb865295169.gif",
	    		1121: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/73093e79-65b4-464d-a2d0-e6b15db2160a.gif",
	    		1122: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/5bcf9981-e591-4839-8508-e94ac121b7b4.gif",
	    		1211: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/cf4b094e-40f5-43fe-802d-60c99a8afc5d.gif",
	    		1212: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/b283d801-9e0e-43f6-a928-0506856242d3.gif",
	    		1221: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/73be2dae-cd70-4427-83e4-c6fd4c8bac41.gif",
	    		1222: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/17588d52-9f61-4ae0-a6a6-ba7a16aad10a.gif",
	    		1311: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/1df1c1f6-4cad-42cc-a9a3-e6d6b7ecbec3.gif",
	    		1312: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/fdf842ad-bb19-48a0-9565-0760beda3691.gif",
	    		1321: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/07dac27c-b88c-4deb-9d70-39e419fdd246.gif",
	    		1322: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/06a0b982-be3b-43a7-8971-d69408cbc68e.gif",
	    		2111: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/18aea6b1-8976-4d1c-aa04-ddf0a0f3c7c5.gif",
	    		2112: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/f71339e1-7e79-4ab6-956b-c32f41965ac0.gif",
	    		2121: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/365f74a4-6d31-4c70-b308-b96179de6ca6.gif",
	    		2122: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/d87e59c9-1367-458a-8971-5b6e2733e439.gif",
	    		2211: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/195e05c9-c0f1-430b-9d13-f5e66707d1da.gif",
	    		2212: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/3977cada-9fe8-49a6-a69f-e5851888f8ee.gif",
	    		2221: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/d8ca272f-fbd1-4ebf-93e0-308605c8d74a.gif",
	    		2222: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/30432a53-d65e-4681-a7cf-5e7c930c00c9.gif",
	    		2311: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/683465bd-66df-4557-930c-450eccca7462.gif",
	    		2312: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/1d0d7789-d7e7-4c4d-8ebb-b063f8afd89c.gif",
	    		2321: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/8e3c0e6e-1778-4a0c-96cd-1c2a13443f60.gif",
	    		2322: "https://gallery.mailchimp.com/d315f5c90383bfabed29d42e8/images/1392453a-ef2c-499b-90c4-a800a4194a4b.gif",
	    	}
	    	var ecouserscore = endRapportscore.eco1;
	    	var scoreUser = meerMinder(ecouserscore);
	    	function meerMinder(e){
	    		if (e > 66){
	    			return "meer";
	    		}
	    		else {
	    			return "minder";
	    		}
	    	}
	    	var widthmechelen = 66;
	    	var characterMandrill = '<img align="none" height="261" src="'+mailchimpImages[sliced]+'" style="width: 100px; height: 261px; margin: 0px;" width="100">';
	      	$http.post('https://mandrillapp.com/api/1.0//messages/sendTemplate.json', {
	            'key': mandrillKey,
	            "template_name": "endRapport",
   				"template_content": [
       				 {
				            "name": "money",
				            "content": moneyMandrill
				     },
				     {
				            "name": "eco",
				            "content": ecoMandrill
				     },
				     {
				            "name": "pub",
				            "content": publicMandrill
				     },
				     {
				            "name": "character",
				            "content": characterMandrill
				     }
				     ,
				     {
				            "name": "testtable",
				            "content": testtable
				     }
				     
				],
	            'message': {
	              'text': ' '+firstName+' u heeft goed gescoord',
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
	               "metadata": {
			            "username": firstName,
			            "location_id": "111"
			        },
			      "global_merge_vars": [
			                {
			                    "name": "FNAME",
			                    "content": firstName
			                },
			                {
			                    "name": "widthmechelen",
			                    "content": widthmechelen
			                },
			                {
			                    "name": "WIDTHECOUSER",
			                    "content": endRapportscore.eco3
			                },
			                {
			                    "name": "WIDTHECOTOTALUSER",
			                    "content": endRapportscore.eco4
			                },
			                {
			                    "name": "WIDTHPUBUSER",
			                    "content": endRapportscore.pub3
			                },
			                {
			                    "name": "WIDTHPUBTOTALUSER",
			                    "content": endRapportscore.pub4
			                },
			                {
			                    "name": "WIDTHMONEYUSER",
			                    "content": endRapportscore.money3
			                },
			                {
			                    "name": "WIDTHMONEYTOTALUSER",
			                    "content": endRapportscore.money4
			                },
			                {
			                    "name": "MEERMINDER",
			                    "content": scoreUser
			                },
			                {
			                	"name": "KARAKTER",
			                	"content": characterMandrill
			                },
			                {
			                	"name": "ECOTEXT",
			                	"content": endRapportscore.eco1
			                },
			                {
			                	"name": "PUBTEXT",
			                	"content": endRapportscore.pub1
			                },
			                {
			                	"name": "MONEYTEXT",
			                	"content": endRapportscore.money1
			                }
			       ],
	              'headers': {
	                'Reply-To': emailNeutraal
	              }
	            }

	          }).success(function (data) {
			   $state.go('endRapport', {userperc: endRapportscore});
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

      var sendMailchimpNieuwsbrief = function(name, firstName, email){
	      	$http.post('https://us12.api.mailchimp.com/2.0/lists/subscribe.json?apikey='+mailchimpKey+'&id=901ee916a2&email[email]='+email+'&merge_vars[FNAME]='+firstName+'&merge_vars[LNAME]='+name+'&double_optin=false&send_welcome=false');

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
      	sendMailchimp:sendMailchimp,
      	sendMailchimpNieuwsbrief:sendMailchimpNieuwsbrief,
      	getCharacter:getCharacter
      }

        
       
    
}]);