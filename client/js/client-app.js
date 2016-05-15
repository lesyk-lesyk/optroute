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


app.controller('searchController', ['$scope', 'SearchFactory', 'GMFactory', function($scope, SearchFactory, GMFactory){
  GMFactory.initialize();

  $scope.clearMap = GMFactory.clearMap;
  $scope.getAddresses = GMFactory.getAddresses;

}]); 

app.factory('GMFactory', ['$http', '$q', function ($http, $q) {

  var map;
  var locations = [];
  var addresses = [];
  var markers = [];

  var geocoder  = new google.maps.Geocoder();

  var initialize = function() {
    var myLatLng = {lat: 49.838425, lng: 24.031116};
    // If map has not been created already...
    if (!map){
      // Create a new map and place in the index.html page
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng
      });

      google.maps.event.addListener(map, 'click', function(event) {
        locations.push(event.latLng);
        clearMarkers();
        drawMarkers();
        getAddressFromLocation(event.latLng)
        .then(function(address) {
          addresses.push(address);
        }, function(err) {
          console.log(err);
        });
      });
    }
  };

  function clearMarkers() {
    markers.forEach(function(marker){marker.setMap(null);});
    markers = [];
  }

  function clearMap(){
    clearMarkers();
    locations = [];
    addresses = [];
  }

  function drawMarkers(){
    locations.forEach(function(location){
      var marker = new google.maps.Marker({
        position: location,
        map: map,
      });
      markers.push(marker);
      map.panTo(location);
    })
  };

  function getAddressFromLocation(location) {
    return $q(function(resolve, reject) {
      var geocoder = new google.maps.Geocoder();             

      geocoder.geocode({'latLng': location}, function (results, status) {
        if(status == google.maps.GeocoderStatus.OK) 
        { 
          string_address = results[0].formatted_address;                            
          resolve(string_address);
        }
        else {
          reject("Geocode failure: " + status);  
        }   
      });
    });
  }

  function getAddresses(){
    return addresses;
  };

  var factory = {
    initialize: initialize,
    clearMap: clearMap,
    getAddresses: getAddresses
  };
  return factory;

}]);



app.factory('SearchFactory', ['$http', function ($http) {
  var factory = {};
  return factory;
}]);
