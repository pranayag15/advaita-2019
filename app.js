var createError     = require('http-errors'),
     express        = require('express'),
     app            = express(),
     path           = require('path'),
     flash          = require('connect-flash'),
     logger         = require('morgan'),
     mongoose       = require('mongoose'),
     session        = require('express-session'),
     passport       = require('passport'),
     bodyParser     = require("body-parser"),
     cookieParser   = require('cookie-parser'),
     LocalStrategy  = require('passport-local'),
     expressValidator = require('express-validator'),
     seedDB      = require('./seed'),
     foodDB      = require('./foodseed'),
     seedRegister   = require('./seedRegister');
     app.use(expressValidator()),
     redirect    = require("express-redirect");

redirect(app); 
var router = express.Router();
// var bodyParser = require('body-parser');
var server = require('http').createServer(app);
app.use(bodyParser.json());

var Event     =  require('./models/events'),
    Category  =  require('./models/category'),
    models      =  require('./models/register'),
    User  = models.User;

var indexRouter = require('./routes/index'),
    // usersRouter = require('./routes/users'),
    authRouter  = require('./routes/auth'),
    testRouter  = require('./routes/test'),
    eventsRouter= require('./routes/events');
app.use(router);
// require('./routes/admin/testtxn')(app);
require('./routes/admin/pgredirect')(app);
// require('./routes/admin/response')(app);

// seedDB();
// foodDB();
// seedRegister();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mongoose.connect("mongodb://localhost/advaita_v2" , { useNewUrlParser: true });
mongoose.connect("mongodb://pranay:advaita2k19@ds135747.mlab.com:35747/advaita", {useNewUrlParser: true});
// mongoose.connect("mongodb://<dbuser>:<dbpassword>@ds111065.mlab.com:11065/advaita2", {useNewUrlParser: true});
// app.use(logger('dev')); //morgan used for loggging request details.
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('static'));
app.use(flash());

app.use(session({
  secret: "Advaita",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.registerError = req.flash('registrationError');
  res.locals.existingUsername = req.flash('existingUsername');
  res.locals.existingEvent = req.flash('eventRegister');
  res.locals.loginError = req.flash('error')
  res.locals.loginSuccess = req.flash('success');
  next();
});

app.get('/health-check', (req, res)=>{
    res.sendStatus(200);
})

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', eventsRouter);
app.use('/', testRouter);
// require('./routes/admin/testtxn')(app);
require('./routes/admin/pgredirect')(app);
// require('./routes/admin/response')(app);
// app.use('/users', usersRouter);

server.listen(process.env.PORT, process.env.IP, function(){
   console.log("ADVAITA server has started");
});