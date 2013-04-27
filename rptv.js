var https = require ('https');
var request = require('request');

var date = new Date();
var time = Math.floor(date.getTime() / 1000);
var url1 = 'https://rapportive.com/login_status?user_email=' + 'goofyahead@gmail.com' + '&client_version=ChromeExtension+rapportive+1.4.1&client_stamp=' + time;
var url2 = 'https://profiles.rapportive.com/contacts/email/' + 'robert.winslow@gmail.com' + '?recheck_after=3&polling_active=true&user_email=' + 'goofyahead@gmail.com' + '&client_version=ChromeExtension+rapportive+1.4.1&client_stamp=' + time;

var timestamp = Date.now();

request(url1, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var result = JSON.parse(body);
   	console.log(result.session_token);
   	request( { 
   		method: 'GET', 
   		uri: url2,
   		headers: {'X-Session-Token' : result.session_token}
    }, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var result = JSON.parse(body);
	   	console.log(result.contact.name);
	   	var elapsed = Date.now() - timestamp;
	   	console.log('took ' + elapsed);
	  }
	});
  }
});