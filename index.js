var express = require("express"),
	bodyParser = require("body-parser");


var app = express();
app.use(bodyParser.json());

var weatherData = [
	{
		username: "Oulu",
		temperature: -5,
		humidity: 76
	},
	{
		username: "Brelin",
		temperature: 10,
		humidity: 80
	},
	{
		username: "London",
		temperature: -3,
		humidity: 44
	}
]

app.get('/', function(req, res){
	res.send('Hello World');
});

app.get('/weather', function(req, res){
	res.json({ data: weatherData});
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

app.listen(process.env.PORT || 3000, function(){
	console.log('Server is running on port ' + process.env.PORT);
});