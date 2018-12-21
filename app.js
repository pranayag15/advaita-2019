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
     seedRegister   = require('./seedRegister');

     app.use(expressValidator());


var Event     =  require('./models/events'),
    Category  =  require('./models/category'),
    User      =  require('./models/register');

var indexRouter = require('./routes/index'),
    // usersRouter = require('./routes/users'),
    authRouter  = require('./routes/auth'),
    eventsRouter= require('./routes/events');

// seedDB();
// seedRegister();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mongoose.connect("mongodb://localhost/advaita_v2" , { useNewUrlParser: true });
mongoose.connect("mongodb://pranay:advaita2k19@ds135747.mlab.com:35747/advaita", {useNewUrlParser: true});
// app.use(logger('dev')); //morgan used for loggging request details.
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
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
  next();
});

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', eventsRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler

// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

// app.listen(8000, function(){
//   console.log("chl gya bhai");
// });

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("ADVAITA server has started");
});