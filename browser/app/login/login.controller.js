'use strict';

app.controller('LoginCtrl', function($scope, Auth, $state, $http) {
  $scope.loginUser = function(userData) {
    Auth.login(userData)
      .then(function() {
        $state.go('stories');
      })
      .catch(function(e) {
        console.log('error logging in', e);
      });
  };
});