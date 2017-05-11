var restify = require('restify');
var builder = require('botbuilder');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function(){
	console.log("%s listening to %s", server.name, server.url);
});

var connector = new builder.ChatConnector({
	appId: 'c09c7fb0-af8a-444b-a01e-b05b4d060e87', //
	appPassword: 'PhSiJmUhgNXDuL5WjQVnKvL' //
});

server.post('/api/messages', connector.listen());
var bot = new builder.UniversalBot(connector);

var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/4ead4131-317c-4057-982f-96c268ae64a3?subscription-key=bc70d83510c24b22b86931c5e2b5424f&staging=true&verbose=true&timezoneOffset=0&q=';
var recognizer = new builder.LuisRecognizer(model);
bot.recognizer(recognizer);
//var recognizer = new builder.LuisRecognizer(model);
//var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
server.post('/api/messages', connector.listen());

//bot.dialog('/', dialog);
bot.dialog('TestIntent',[
	function(session, args){
		var intent = args.intent;
        var email = builder.EntityRecognizer.findEntity(intent.entities, 'customer-email');
		session.send("Your email is " + args.score  + " " + email);
	}]).triggerAction({
    matches: 'TestIntent',
    onInterrupted: function (session) {
        session.send('Please provide a destination');
    }
	});

/*dialog.matches('Price',[
	function(session, args){
		var intent = args.intent;
        var price = builder.EntityRecognizer.findAllEntities(intent.entities, 'Price');
        session.dialogData.searchType = 'price';
		session.send("Your price is " + price);
	}]);*/
