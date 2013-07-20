var express = require('express');
var cons = require('consolidate');
var swig = require('swig');
var app = express();

app.configure(function(){
    // template
    app.engine('.html', cons.swig);
    app.set('view engine', 'html');
    swig.init({
	  root: __dirname + '/views',
	  allowErrors: true
	});
    app.set('views', __dirname + '/views');
    app.set('view options', { layout: false });
    app.set('view cache', false);

    // gzip
    app.use(express.compress());

    // static files, cached and expire in 30 days
    // change path / to /public if need dynamic web
    app.use("/", express.static(__dirname+'/public', {maxAge:2592000000}));
    // link to bower components
    // app.use("/public/lib", express.static(__dirname+'/components'));

    // mime
    express.static.mime.define({'application/x-web-app-manifest+json': ['webapp']});
    express.static.mime.define({'text/cache-manifest': ['appcache']});
    express.static.mime.define({'image/x-icon': ['ico']});
    // express.static.mime.define({'audio/ogg': ['ogg']});
    // express.static.mime.define({'audio/mp4': ['m4a']});

    // error
    app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
});

// routes
// enable route if need dynamic web
/*
app.get('/', function(req, res) {
    // res.send('Hello from <a href="http://appfog.com">AppFog.com</a>');
    res.render('index.html', {foo:'bar'});
});
*/

// a function to verify that the current user is authenticated
function checkAuth(req, res, next) {
  if (!req.session.user) {
    res.send("authentication required\n", 401);
  } else {
    next();
  }
}

app.get('/persona', function(req, res) {
    // res.send('Hello from <a href="http://appfog.com">AppFog.com</a>');
    res.render('persona.html', {email:''});
});

app.post('/auth', function(req, res) {
  request.post({
    url: 'https://login.persona.org/verify',
    json: {
      assertion: req.body.assertion,
      audience: "http://127.0.0.1:8000"
    }
  }, function(e, r, body) {
    if(body && body.email) {
      req.session.email = body.email;
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

app.use(express.cookieParser())
   .use(express.bodyParser())
   .use(express.cookieSession({
     secret: "meh"
   }))
   .use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
  res.render('index.ejs', { email: req.session.email || null });
});

app.get('/logout', function(req, res) {
  req.session = null;
  res.redirect('/');
});

app.post('/auth', function(req, res) {
  request.post({
    url: 'https://verifier.login.persona.org/verify',
    json: {
      assertion: req.body.assertion,
      audience: "http://127.0.0.1:3000"
    }
  }, function(e, r, body) {
    if(body && body.email) {
      req.session.email = body.email;
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

// port
var app_port = process.env.VCAP_APP_PORT || 8000;
app.listen(app_port, function() {
  console.log("Listening on " + app_port);
});
