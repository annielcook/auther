'use strict';

var router = require('express').Router(),
  bodyParser = require('body-parser'),
  session = require('express-session');

var User = require('../api/users/user.model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false
}));

router.use(session({
  // the secret encrypts the session id cookie
  secret: 'tongiscool',
  cookie: {
    // this keeps the session cookie from being sent over HTTP
    // otherwise it would be easy to hijack the session!
    //secure: true,
    // resave forces the session to be saved back to the session store
    // even if the session was never modified during the request
    // resave is only necessary for certain session stores
    // in our case we shouldn't need it
    saveUninitialized: false,
    // by setting saveUninitialized to false
    // we will be preventing the session from being created
    // until it has data associated with it
    resave: false
  }
}));

module.exports = router;