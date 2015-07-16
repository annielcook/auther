'use strict'; 

var router = require('express').Router(),
	bodyParser = require('body-parser');

var User = require('../api/users/user.model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

module.exports = router;