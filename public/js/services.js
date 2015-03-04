/* Services */

'use strict';

/* Auth factory: post login/logout to the server and check if we have a user stored in cookies */
app.factory('Auth', function($http, $rootScope, $cookieStore){

  $rootScope.user = $cookieStore.get('user') || {};
  $cookieStore.remove('user');

  return {
    isLoggedIn: function(user) {
      if(user === undefined) {
        user = $rootScope.user;
      }
      return user;
    },
    login: function(user, success, error) {
      $http.post('/login', user).success(function(user){
        $rootScope.user = user;
        success(user);
      }).error(error);
    },
    logout: function(success, error) {
      $http.post('/logout').success(function(){
        $rootScope.user = '';
        success();
      }).error(error);
    }
  };
}).factory('API', function($http){

  return {
    get: function(query, success, error) {
      $http.get('/api/get').success(function(data){
        success(data);
      }).error(error);
    }
  };
});