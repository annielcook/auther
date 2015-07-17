'use strict';

app.controller('LoginCtrl', function($scope, Auth, $state, $http, $rootScope) {
  $scope.loginUser = function(userData) {
    Auth.login(userData)
      .then(function(loggedInUser) {
        $rootScope.currentUser = userData.email;
        $state.go('user', {
          id: loggedInUser._id
        });
      })
      .catch(function(e) {
        console.log('error logging in', e);
      });
  };
});