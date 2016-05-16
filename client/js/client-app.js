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
  $scope.calculateRoute = GMFactory.calculateRoute;
  $scope.optimizeRoute = GMFactory.optimizeRoute;
  $scope.calculateMatrixDistances = GMFactory.calculateMatrixDistances;
  $scope.getMatrixDistances = GMFactory.getMatrixDistances;

}]); 

app.factory('GMFactory', ['$http', '$q', function ($http, $q) {

  var map;
  var locations = [];
  var addresses = [];
  var markers = [];
  var matrixDistances = [];

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
      directionsDisplay.setMap(map);
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
    matrixDistances = [];
    directionsDisplay.setMap(null); //Доробити видалення
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

  function optimizeRoute(){}

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();

  function calculateRoute() {
    directionsDisplay.setMap(map);
    clearMarkers();
    var start = locations[0];
    var end = locations[0];   
    var waypts = [];
    var selectedMode = document.getElementById('mode').value;
    for (var i = 1; i < locations.length; i++) {
      waypts.push({
        location:locations[i],
        stopover:true
      });
    }
    var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode[selectedMode],
      waypoints: waypts
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        
        var route = response.routes[0];
        var totalLength=0;
        var totalDuration=0;
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;        
          totalLength+=route.legs[i].distance.value;
          totalDuration+=route.legs[i].duration.value;
        }
        console.log("Довжина початкового маршруту: ", totalLength/1000, "km");
        console.log("Тривалість початкового маршруту: ", totalDuration/60, "m");
      }
    });
  }

  function calculateMatrixDistances(){
    var promise = $q(function(resolve, reject) {
      var service = new google.maps.DistanceMatrixService();
      var selectedMode = document.getElementById('mode').value;
      var matrix=[];
      service.getDistanceMatrix({
          origins: locations,
          destinations: locations,
          travelMode: google.maps.TravelMode[selectedMode]
        }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK) {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;

          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            var tmp = [];
            for (var j = 0; j < results.length; j++) {
              var element = results[j];
              var distance = element.distance.value/1000;
              var duration = element.duration.text;
              var From = origins[i];
              var to = destinations[j];

              // console.log(distance, duration, From, to);
              tmp.push(distance);
            }
            matrix.push(tmp);
          }
          resolve(matrix);
        } else {
          reject(status);
        }
      });
    });
    
    promise.then(function(results){matrixDistances = results});
  };

  function getMatrixDistances(){
    return matrixDistances;
  }

  
  var factory = {
    initialize: initialize,
    clearMap: clearMap,
    getAddresses: getAddresses,
    calculateRoute: calculateRoute,
    optimizeRoute: optimizeRoute,
    calculateMatrixDistances: calculateMatrixDistances,
    getMatrixDistances: getMatrixDistances
  };
  return factory;

}]);



app.factory('SearchFactory', ['$http', function ($http) {
  var factory = {};
  return factory;
}]);
