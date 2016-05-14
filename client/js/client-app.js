var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'partials/home.html',
  })
  .when('/search', {
    controller : 'searchController',
    templateUrl : 'partials/search.html',
  })
  .when('/about', {
    templateUrl : 'partials/about.html',
  })
  .otherwise({
    templateUrl : 'partials/404.html',
  });
});


app.controller('searchController', ['$scope', 'SearchFactory', function($scope, SearchFactory){
  console.log('searchController');
  SearchFactory.somefunc();
}]); 


app.factory('SearchFactory', ['$http', function ($http) {
  console.log('SearchFactory init');

  function somefunc(){
    console.log('somefunc');
  }

  var factory = {
    somefunc: somefunc
  }

  return factory;
}]);
