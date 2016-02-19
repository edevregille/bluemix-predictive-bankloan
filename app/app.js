var path			 	= require('http');
var path			 	= require('https');
var path			 	= require('path');
var bodyParser 	= require('body-parser');
var express    	= require('express');
var request 		= require('request');

var app        	= express(); // define our app using express

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = (process.env.VCAP_APP_PORT || process.env.PORT || 3000);
var host = (process.env.VCAP_APP_HOST || process.env.HOST || 'localhost');

var defaultBaseURL ='';
var defaultAccessKey='';
var contextID='bank';

// view engine setup - configure
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views'));

// VCAP_SERVICES contains all the credentials of services bound to this application. 
var env = { baseURL: defaultBaseURL, accessKey: defaultAccessKey, contextID: contextID };
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
var service = (services['pm-20'] || "{}");
var credentials = service[0].credentials;
if (credentials != null) {
		env.baseURL = credentials.url;
		env.accessKey = credentials.access_key;
}

//get the index page
app.get('/', function(req,res,next){
	res.render('index');
	next();
});

// get env details
app.get('/env',function(req,res,next){
	res.json(env);
	next();
});

//get metadata details (model)
app.get('/metadata', function(req,res,next){
	var metaURI = env.baseURL + '/metadata/' + contextID +'?accesskey='+env.accessKey + '&metadatatype=score';
	var r = request.get(metaURI, {json:true});
	r.pipe(res, function(err){
		if (err) {
			console.log(err);
		}
		else{
			res.json(r);
		}
	});	
});
		

// score request
app.post('/api/score', function(req, res) {
	var scoreURI = env.baseURL + '/score/' + contextID + '?accesskey=' + env.accessKey;
	console.log('=== SCORE ===');
	console.log('  URI  : ' + scoreURI);
	console.log('  Input: ' + JSON.stringify(req.body.input));
	console.log(' ');
	try {
		var r = request.post(scoreURI, { json: true, body: req.body.input });
		console.log(JSON.stringify(r));
		r.pipe(res, function(err){
			if (err) {
				console.log(err);
			}
			else{
				console.log('success');
			}
		});
	} catch (e) {
		console.log('Score exception ' + JSON.stringify(e));
    	var msg = '';
    	if (e instanceof String) {
    		msg = e;
    	} else if (e instanceof Object) {
      		msg = JSON.stringify(e);
    	}
    
    	res.status(200);
    	return res.send(JSON.stringify({
        	flag: false,
        	message: msg
  		}));
	}
	
	process.on('uncaughtException', function (err) {
    console.log(err);
	}); 
});
      
// Start the server node
app.listen(port, host);
console.log('App started on port ' + port);
