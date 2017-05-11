var express = require('express')
  , routes = require('./routes/index.js')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  // , User = require('./models/user')
  // , Article = require('./models/article')
  , _ = require('underscore')
  , flash = require('connect-flash')
  , mongoStore = require('connect-mongo')(express)
  , path = require('path');
// 
var dbUrl1 = 'mongodb://localhost/geek';
mongoose.connect(dbUrl1);

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'ejs');
  
  app.use(flash());
  app.use(express.static(path.join(__dirname,'public')))
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret:'geek',
    store: new mongoStore({
      url:dbUrl1,
      collection:'sessions'
    })
  }));
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
