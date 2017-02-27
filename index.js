var express = require("express"),
	bodyParser = require("body-parser");


var app = express();
app.use(bodyParser.json());
var users =[{
		username:"yassinelaadraoui",
		password:"yassine",
		email:"yassinelaadraoui@gmail.com",
		bio:"It Student",
		count: {
				follower:100,
				following: 0,
				posts: 1
		},
		following:["Oulu"],
		posts :[{
				id: 1,
				url : "https://adizkat.files.wordpress.com/2013/10/download2.jpg",
				caption:"some caption #life",
				likes:6,
				comments:""
					
				},{
				id: 2,
				url : "https://adizkat.files.wordpress.com/2013/10/download2.jpg",
				caption:"some caption #life",
				likes:6,
				comments:""
					
				},{
				id: 3,
				url : "https://adizkat.files.wordpress.com/2013/10/download2.jpg",
				caption:"some caption #life",
				likes:6,
				comments:""
					
				}]
				
		},
		{
		username:"oulu",
		password:"oulu",
		email:"yassinelaadraoui@gmail.com",
		bio:"It Student",
		count: {
				follower:100,
				following: 0,
				posts: 1
		},
		following:["Oulu"],
		posts :[{
				id: 1,
				url : "https://s-media-cache-ak0.pinimg.com/originals/71/d3/79/71d3798a97f84c1882283978bd2fd7f8.jpg",
				caption:"some caption #life",
				likes:6,
				comments:""
					
				},{
				id: 2,
				url : "https://s-media-cache-ak0.pinimg.com/originals/29/1d/fa/291dfa930840dc32d8c4d5dab0df5fa8.jpg",
				caption:"some caption #life",
				likes:6,
				comments:""
					
				},{
				id: 3,
				url : "http://kuvat.oulunmiekkailuseura.fi/oulu.jpg",
				caption:"some caption #life",
				likes:6,
				comments:""
					
				}]
				
		}]
var weatherData = [
	{
		username: "Oulu",
		caption: "some caption #life",
		url: "http://kuvat.oulunmiekkailuseura.fi/oulu.jpg",
		likes: 5,
		tag:"#life"

		
	},
	{
		username: "Oulu",
		caption: "Oulu",
		url: "https://s-media-cache-ak0.pinimg.com/originals/29/1d/fa/291dfa930840dc32d8c4d5dab0df5fa8.jpg",
		likes: 10,
		tag:"#life"

		
	},
	{
		username: "Oulu",
		caption: "Oulu",
		url: "https://s-media-cache-ak0.pinimg.com/originals/71/d3/79/71d3798a97f84c1882283978bd2fd7f8.jpg",
		likes: 5,
		tag:"#life"

		
	},
	{
		username: "Oulu",
		caption: "Oulu",
		url: "http://paradiseintheworld.com/wp-content/uploads/2012/01/casablanca-morocco.jpg",
		likes: 5,
		tag:"#oulu"
	},
	{
		username: "yassinemaadraoui",
		caption: "Oulu",
		url: "http://paradiseintheworld.com/wp-content/uploads/2012/01/casablanca-morocco.jpg",
		likes: 5,
		tag:"#yassine"
	},
	{
		username: "yassinelaadraoui",
		caption: "Oulu",
		url: "https://adizkat.files.wordpress.com/2013/10/download2.jpg",
		likes: 5,
		tag:"#yassine"
	}
]
var searchedpost = [

	]
var searchedtag = [

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
app.get('/searchedpost', function(req, res){
	res.json({ data: searchedpost});
});
app.post('/searchedpost',function(req, res){
	searchedpost.push(req.body);
	res.sendStatus(200);

});
app.post('/user',function(req, res){
	users.push(req.body);
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