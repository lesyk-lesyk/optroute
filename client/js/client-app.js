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


app.controller('searchController', ['$scope', 'GMFactory', function($scope, GMFactory){
  GMFactory.initialize();

  $scope.clearMap = GMFactory.clearMap;
  $scope.getAddresses = GMFactory.getAddresses;
  $scope.calculateRoute = GMFactory.calculateRoute;
  $scope.optimizeRoute = GMFactory.optimizeRoute;
  $scope.calculateMatrixDistances = GMFactory.calculateMatrixDistances;
  $scope.getMatrixDistances = GMFactory.getMatrixDistances;
  $scope.testData1 = GMFactory.testData1;
  $scope.testData2 = GMFactory.testData2;
  $scope.testData3 = GMFactory.testData3;

}]); 

app.factory('GMFactory', ['$http', '$q', 'SearchFactory', function ($http, $q, SearchFactory) {

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
        addPoint(event.latLng)
      });
    }
  };

  function addPoint(location){
    locations.push(location);
    clearMarkers();
    drawMarkers();
    addAddressFromLocation(location);
  }

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
    })
    map.panTo(locations[locations.length-1]);
  };

  function addAddressFromLocation(location) {
    var promise = $q(function(resolve, reject) {
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
    promise.then(function(address) {
      addresses.push(address);
    }, function(err) {
      console.log(err);
    });
  }

  function getAddresses(){
    return addresses;
  };

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

  function calculateOptRoute(locations, order) {
    directionsDisplay.setMap(null);
    directionsDisplay.setMap(map);
    clearMarkers();
    var start = locations[order[0]];
    var end = locations[order[0]];   
    var waypts = [];
    var selectedMode = document.getElementById('mode').value;
    for (var i = 1; i < locations.length; i++) {
      waypts.push({
        location:locations[order[i]],
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
        console.log("Довжина Оптимізованого маршруту: ", totalLength/1000, "km");
        console.log("Тривалість Оптимізованого маршруту: ", totalDuration/60, "m");
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
              // var duration = element.duration.text;
              // var From = origins[i];
              // var to = destinations[j];
              if (i == j) { distance = Infinity}
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

    promise.then(function(results){matrixDistances = results}, function(err) {console.log(err);});
  };

  function getMatrixDistances(){
    return matrixDistances;
  }

  function optimizeRoute(){
    var order = SearchFactory.nearestNeighbour(matrixDistances);
    calculateOptRoute(locations, order);
  };
  
  function testData1(){
    var location1  = new google.maps.LatLng(49.843512, 24.026664);
    var location2  = new google.maps.LatLng(49.833356, 24.038725);
    var location3  = new google.maps.LatLng(49.837229, 24.017517);

    var arr = [location1, location2, location3];
    
    var index = 0;
    callNTimes(3, 1000, function() {
      addPoint(arr[index]);
      index++;
    });
  };

  function testData2(){
    var location1  = new google.maps.LatLng(49.839683, 24.029717);
    var location2  = new google.maps.LatLng(50.4501, 30.5234);
    var location3  = new google.maps.LatLng(48.2920787, 25.9358367);
    var location4  = new google.maps.LatLng(49.233083, 28.468217);
    var location5  = new google.maps.LatLng(48.6208, 22.287883);

    var arr = [location1, location2, location3, location4, location5];
    
    var index = 0;
    callNTimes(5, 1000, function() {
      addPoint(arr[index]);
      index++;
    });
  };

  function testData3(){
    var location1  = new google.maps.LatLng(49.839683, 24.029717);
    var location2  = new google.maps.LatLng(50.4501, 30.5234);
    var location3  = new google.maps.LatLng(48.2920787, 25.9358367);
    var location4  = new google.maps.LatLng(49.233083, 28.468217);
    var location5  = new google.maps.LatLng(48.6208, 22.287883);
    var location6  = new google.maps.LatLng(46.635417, 32.616867);
    var location7  = new google.maps.LatLng(50.6199, 26.251617);
    var location8  = new google.maps.LatLng(49.588267, 34.551417);
    var location9  = new google.maps.LatLng(49.9935, 36.230383);

    var arr = [location1, location2, location3, location4, location5, location6, location7, location8, location9];
    
    var index = 0;
    callNTimes(9, 1000, function() {
      addPoint(arr[index]);
      index++;
    });
  };

  var factory = {
    initialize: initialize,
    testData1: testData1,
    testData2: testData2,
    testData3: testData3,
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
  function nearestNeighbour(matrix){
    var order = [0];
    var row=0;
    for (var i=0; i<matrix.length-1; i++){
      var min = Infinity;
      var minIndex = 0;
      for (var j=0; j<matrix[row].length; j++){
        if (matrix[row][j]<min && order.indexOf(j) == -1){ minIndex=j; min=matrix[row][j]}
      }
      order.push(minIndex);
      row=minIndex;
    }
    return order;
  }

  var factory = {
    nearestNeighbour: nearestNeighbour,
  };
  return factory;
}]);



// function for cyclic calling some function with delay in ms
function callNTimes(n, time, fn) {
  function callFn() {
    if (--n < 0) return;
    fn();
    setTimeout(callFn, time);
  }
  setTimeout(callFn, time);
}