'use strict';

app.factory('Auth', function(User, $http) {
  return {
    signup: function(credentials) {
      //sends to the backend and makes an ajax request
      return new User(credentials).save();
    },
    login: function(credentials) {
      return $http.post('/auth/login', credentials)
        .then(function(res) {
          return res.data;
        });
    }

  }
});