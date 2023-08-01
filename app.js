const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
require('dotenv').config(); // Load all environment variables before using them (session, passport and env)

const app = express(); // Initialize the express app before using it
const port = process.env.PORT || 3000;

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); //always mount passport after session middleware and always before any other routes

app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
  });
  

require('./config/passport');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); //don't need to list the whole path for any request
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js')
app.use('/', routes);

const indexRoutes = require('./server/routes/index.js');
app.use('/', indexRoutes);

app.listen(port, () => console.log(`Listening to port ${port}`));