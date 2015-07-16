'use strict';

app.controller('SignupCtrl', function ($scope, Auth, $state) {
	$scope.signupUser = function (userData) {
		Auth.signup(userData)
		.then(function () {
			$state.go('stories');
		});
	};
});