















var express = require("express"),
	bodyParser = require("body-parser");

var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";
var app = express();
app.use(bodyParser.json());
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
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


// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/contacts", function(req, res) {
});

app.post("/api/contacts", function(req, res) {
  var newContact = req.body;

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

app.get("/api/contacts", function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/contacts", function(req, res) {
  var newContact = req.body;

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});
/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/contacts/:id", function(req, res) {
});

app.put("/api/contacts/:id", function(req, res) {
});

app.delete("/api/contacts/:id", function(req, res) {
});

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