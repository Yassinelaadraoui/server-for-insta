var express = require("express"),
	bodyParser = require("body-parser");


var app = express();
app.use(bodyParser.json());
var users =[{
		username:"yassinelaadraoui",
		password:"yassine",
		email:"yassinelaadraoui@gmail.com"
}]
var weatherData = [
	{
		username: "Oulu",
		caption: "Oulu",
		url: "http://paradiseintheworld.com/wp-content/uploads/2012/01/casablanca-morocco.jpg",
		likes: 5
		
	},
	{
		username: "Oulu",
		caption: "Oulu",
		url: "http://paradiseintheworld.com/wp-content/uploads/2012/01/casablanca-morocco.jpg",
		likes: 5
	},
	{
		username: "Oulu",
		caption: "Oulu",
		url: "http://paradiseintheworld.com/wp-content/uploads/2012/01/casablanca-morocco.jpg",
		likes: 5
	}
]
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
     // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});
app.get('/', function(req, res){
	res.send('Hello World');
});

app.get('/weather', function(req, res){
	res.json({ data: weatherData});
});
app.get('/user', function(req, res){
	res.json({ data: users});
});
app.post('/weather',function(req, res){
	weatherData.push(req.body);
	res.sendStatus(200);

});

app.get('/weather/:city', function(req, res){
	weatherData.forEach(function(item){
		if (item.location.toLowerCase()==req.params.city.toLowerCase()){
			res.json(item);
			return;
		}
	});

	res.sendStatus(404);
});
app.get('/user/:username', function(req, res){
	weatherData.forEach(function(item){
		if (item.location.toLowerCase()==req.params.city.toLowerCase()){
			res.json(item);
			return;
		}
	});

	res.sendStatus(404);
});
app.listen(process.env.PORT || 3000, function(){
	console.log('Server is running on port ' + process.env.PORT);
});