(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Data'];

  function HomeController ($scope, Principal, LoginService, $state, Data ) {
    var vm = this;

    $scope.disasters=[];
    $scope.heatMapPoints=[];

    vm.account = null;
    vm.isAuthenticated = null;
    vm.login = LoginService.open;
    vm.register = register;
    $scope.$on('authenticationSuccess', function() {
      getAccount();
    });



    getAccount();

    loadAlls();

    function getAccount() {
      Principal.identity().then(function(account) {
        vm.account = account;
        console.log(account)
        vm.isAuthenticated = Principal.isAuthenticated;
      });
    }

    function register () {
      $state.go('register');
    }


    function loadAlls () {
      Data.disaster.query(function(result) {
       result.forEach(function (item) {
         $scope.disasters.push(item)
         //console.log(item)
       })
     })}

      /*-----------------------------------------MAP-------------------------------------------------------------------------------*/

      var heatmap;
      var map;
      var markers = [];

      navigator.geolocation.getCurrentPosition(function(position){
        initialize(position.coords);
      }, function(){
        var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
        initialize(sanFrancisco) ;
      });

      function initialize(coords) {
       var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
       var myOptions = {
        zoom: 14,
        center: latlng,
        layerId: '06673056454046135537-08896501997766553811',
        disableDefaultUI : false
      };
      map = new google.maps.Map(document.getElementById('map'), myOptions);
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(document.getElementById('controllerMaps'));

           //create the heatmap
           heatmap = new google.maps.visualization.HeatmapLayer({
            data: $scope.heatMapPoints,
            map: map,
            radius: 65,
          });
          $scope.heatMapPoints = [];

     //listener for zoom
     google.maps.event.addListener(map, 'zoom_changed', function(event) {
       changeZoom(map.getZoom());
     });

   };


//settings for dynamic zoom
function changeZoom(zoom){
  var marker = false;
  switch(zoom) {
    case 18:
    heatmap.set('radius',750);
    removeMarker();

    break;
    case 16:
    heatmap.set('radius',290);
    removeMarker();

    break;
    case 14:
    heatmap.set('radius',80);
    removeMarker();

    break;
    case 14:
    heatmap.set('radius',65);
    removeMarker();

    break;
    case 12:
    heatmap.set('radius',50);
    removeMarker();

    break;
    case 11:
    heatmap.set('radius',35);
    removeMarker();

    break;
    case 10:
    heatmap.set('radius',20);
    removeMarker();

    break;
    case 8:
    heatmap.set('radius',10);
    setMarker();
    break;
    case 6:
    heatmap.set('radius',5);
    setMarker();
    break;
    case 4:
    heatmap.set('radius',5);
    setMarker();
    break;

    case 2:
    heatmap.set('radius',5);
    setMarker();
    break;
    case 1:
    heatmap.set('radius',5);
    setMarker();
    break;


  }

}

//set marker for dynamic zoom
function setMarker(){
  for(var i = 0; i < heatMapDisasterData.length; i++){
    var marker = new google.maps.Marker({
     position: heatMapDisasterData[i].location,
     map: map
   });
    markers.push(marker);
    markers[i].setMap(map);
  }
}

//delete marker for dynamic zoom
function removeMarker(){
  for(var i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  }
}




//sets the points


$scope.disasterHeatMapData = function(){

    $scope.loadHeatMap();
    console.log($scope.heatMapPoints);
}

$scope.offerHeatMapData = function(){
  heatmap.setData(heatMapOfferData);
}

function getHeatMapPoints() {
  var points = heatMapOfferData.concat(heatMapDisasterData);
  return points;

}

//geocoder for city/postalCode/Country
//just need the latlng points
function writeAddressName(latLng) {
  var geocoder = new google.maps.Geocoder();
  var postalCode, city,country;
  geocoder.geocode({
    "location": latLng
  },
  function(results, status) {
    if (status == google.maps.GeocoderStatus.OK){
      console.log(results[0].formatted_address);
      for (var j = 0; j < results[0].address_components.length; j++){
        if (results[0].address_components[j].types[0] == "administrative_area_level_1") {
                        //this is the object you are looking for
                        city = results[0].address_components[j].long_name;
                      }
                      if (results[0].address_components[j].types[0] == "postal_code") {
                        //this is the object you are looking for
                        postalCode = results[0].address_components[j].long_name;
                      }
                      if (results[0].address_components[j].types[0] == "country") {
                        //this is the object you are looking for
                        country = results[0].address_components[j].long_name;
                      }
                    }
                    console.log(city+ " || " + postalCode + " || " + country);


                  }
                  else
                    console.log("error");
                });
}



//load special disaster
$scope.loadDisaster= function(id){
  var coords;
  $scope.disasters.forEach(function (argument) {
      if (argument.id == id) {
          coords = ({location: new google.maps.LatLng(argument.lat, argument.lon), weight: 5});
          console.log(argument.lat, argument.lon);

      }
  });
    heatmap.setData(coords);
    map.panTo(coords[0].location);
};

$scope.loadDisasterHeatMap= function(id){

    Data.actionHeatMap.query({id : id},function(result){
        result.forEach(function (action){
            console.log(action.lat,action.lon);
        $scope.heatMapPoints.push({location: new google.maps.LatLng(action.lat, action.lon), weight : 1});
            })});

      };

$scope.loadHeatMap = function(){

    Data.disaster.query(function(result){
        result.forEach(function(disaster){
       $scope.heatMapPoints.push({location: new google.maps.LatLng(disaster.lat, disaster.lon), weight : 6});
       $scope.loadDisasterHeatMap(disaster.id);
    })});
};

// set of data for heatmap
var heatMapDisasterData = [
{location: new google.maps.LatLng(52.520645, 13.409779), weight: 0.2},
{location: new google.maps.LatLng(55.520645, 13.409779), weight: 0.2},
{location: new google.maps.LatLng(58.520645, 13.409779), weight: 0.2}
];

var heatMapOfferData = [
{location: new google.maps.LatLng(54.520645, 15.409779), weight: 1},
{location: new google.maps.LatLng(60.520645, 15.409779), weight: 1},
{location: new google.maps.LatLng(70.520645, 15.409779), weight: 1}
];

$scope.imagePath = 'content/images/globe.png';

}
})();
