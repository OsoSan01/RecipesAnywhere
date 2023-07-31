const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
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

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const recipeRoutes = require('./server/routes/recipeRoutes.js');
const indexRoutes = require('./server/routes/index.js');
app.use('/', indexRoutes);
app.use('/recipe', recipeRoutes)

app.listen(port, () => console.log(`Listening to port ${port}`));