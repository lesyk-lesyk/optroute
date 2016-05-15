var app = angular.module('app', ['ngRoute', 'uiGmapgoogle-maps']);

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

  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
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
