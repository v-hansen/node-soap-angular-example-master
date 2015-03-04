/* Controllers */

'use strict';

/* Global app controller, assigning some values that will be available globally */
app.controller('AppCtrl',
['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {

  $scope.title = 'Site title';
  $scope.hidden = 'Hidden content';

/* Login view controller: handle login and display the hint */
}]).controller('LoginCtrl',
['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {

  $scope.hint = 'Username: user / Password: password';
  $scope.rememberme = false;

  $scope.login = function() {
    $scope.loader = true;
    Auth.login({
      username  : $scope.username,
      password  : $scope.password,
      rememberme: $scope.rememberme
    },
    function(res) {
      $location.path('/');
    },
    function(err) {
      $rootScope.error = 'Failed to login';
    });
  };

/* Home controller: display greeting, handle logout and get data from SOAP endpoint */
}]).controller('HomeCtrl',
['$rootScope', '$scope', '$location', 'Auth', 'API', function($rootScope, $scope, $location, Auth, API) {

  $scope.greeting = 'Hello ' + $rootScope.user;
  $scope.showlog = false;

  $scope.logout = function() {
    Auth.logout(function() {
      $location.path('/login');
    }, function() {
      $rootScope.error = 'Failed to logout';
    });
  };

  $scope.get = function() {
    $scope.showlog = true;
    API.get($scope.query, function (data) {
      $scope.results = data.results;
      $scope.showlog = false;
    }, function(){
      $rootScope.error = 'Search error';
    });
  }

}]);
