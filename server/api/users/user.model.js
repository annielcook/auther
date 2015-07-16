'use strict';

var mongoose = require('mongoose'),
  shortid = require('shortid'),
  crypto = require('crypto'),
  _ = require('lodash');

var db = require('../../db');
var Story = require('../stories/story.model');

var User = new mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    default: shortid.generate
  },
  name: String,
  photo: String,
  phone: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  // password: String
  hashedPassword: String,
  salt: String

});

// user.password = 'abc' // this calls teh password setter -- it doesnt save it on the user object
// //instead turns it into the hashedpassord and save that
User.virtual('password').set(function(password) {
  this.salt = crypto.randomBytes(16).toString('base64');
  this.hashedPassword = crypto.pbkdf2Sync(password + this.salt, '', 41, 16)
    .toString('base64');
})

//methods are on the instance
User.methods.authenticate = function(password) {
  var passwordToCompare = crypto.pbkdf2Sync(password + this.salt, '', 41, 16)
    .toString('base64');
  if (passwordToCompare === this.hashedPassword) return true
  return false
}


//query is what is the question to ask
//promise is what gets sent back once the query gets executed
//turn a query into a promise by executing it
User.statics.findByEmails = function(set) {
  return this.find({
    emails: {
      $elemMatch: {
        $in: set
      }
    }
  });
};

User.statics.findByEmail = function(email) {
  return this.findOne({
    emails: {
      $elemMatch: {
        $eq: email
      }
    }
  });
};

User.methods.getStories = function() {
  return Story.find({
    author: this._id
  }).exec();
};

module.exports = db.model('User', User);