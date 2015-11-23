angular.module('klimaatneutraal.services').service("mailService",['$http', 'KEYS',
    
    function($http, KEYS){
    //hier komt Mandrill API call

    this.sendRapport = function(send){
        console.log("works");      
        var fromEmail = 'email';

        // hier komt de send naar API
        }
    }
          return $http.post('https://mandrillapp.com/api/1.0//messages/send.json', {
            'key': KEYS.mandrill,
            'message': {
              'html': '<p>Unknown Error Message</p><p>' + resp + '</p><p>Error Code:' + resp.code + '</p>',
              'text': resp,
              'subject': 'Unknown Error Message',
              'from_email': fromEmail,
              'from_name': fromName,
              'to': [
              {
                'email': toEmail,
                'name': toName,
                'type': 'to'
              }
              ],
              'headers': {
                'Reply-To': replyTo
              }
            }
          });
          
                                                                  
                                                                  
]);