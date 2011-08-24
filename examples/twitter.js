/**
 * @fileOverview Twitter Streaming API usage example. Returns streaming search
 *               results. To quickly see results search for "test". Run with
 * 
 * <pre>
 * common-node twitter.js username password keyword
 * </pre>
 */

var HttpClient = require('httpclient').HttpClient;
var TextStream = require('io').TextStream;
var encode = require('./base64').encode;

var stream = new TextStream(new HttpClient({
	method: 'POST',
	url: 'http://stream.twitter.com/1/statuses/filter.json',
	headers: {
		'Authorization': 'Basic ' + encode(system.args[2] + ':' + system.args[3]),
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	body: ['track=' + system.args[4]],
	timeout: 10000
}).finish().body);

var line;
for(;;) {
	line = stream.readLine();
	if(!line.length)
		break;
	if(line.length > 1) {
		var message = JSON.parse(line);
		console.log(message.text);
	}
}