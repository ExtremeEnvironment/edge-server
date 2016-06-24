(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

  function HomeController ($scope, Principal, LoginService, $state ) {
    var vm = this;
    
    vm.account = null;
    vm.isAuthenticated = null;
    vm.login = LoginService.open;
    vm.register = register;
    $scope.$on('authenticationSuccess', function() {
      getAccount();
    });

    getAccount();

    function getAccount() {
      Principal.identity().then(function(account) {
        vm.account = account;
        vm.isAuthenticated = Principal.isAuthenticated;
      });
    }

    function register () {
      $state.go('register');
    }



    var heatmap;

    var map;

    navigator.geolocation.getCurrentPosition(function(position){ 
      initialize(position.coords);
    }, function(){
      var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
      initialize(sanFrancisco) ;
    });

    function initialize(coords) {
     var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
     var myOptions = {
      zoom: 8,
      center: latlng,
      layerId: '06673056454046135537-08896501997766553811',
      disableDefaultUI : false
    };
    map = new google.maps.Map(document.getElementById('map'), myOptions);
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(document.getElementById('controllerMaps'));

           //create the heatmap
           heatmap = new google.maps.visualization.HeatmapLayer({
            data: getHeatMapPoints(),
            map: map,
            radius: 60
          });

//mouselistener for click event
map.addListener('click', function(event) {    
  addMarker(event.latLng);    
});       




//sets the point of the user
var marker = new google.maps.Marker({
  position: latlng, 
  map: map, 
}); 
};


function addMarker(location) {  
  var marker = new google.maps.Marker({  
    position: location,  
    map: map  
  });  
} 

//sets the points
$scope.allHeatMapData = function(){
  heatmap.setData(getHeatMapPoints());
}

$scope.disasterHeatMapData = function(){
  heatmap.setData(heatMapDisasterData);
}

$scope.offerHeatMapData = function(){
  heatmap.setData(heatMapOfferData);
}

function getHeatMapPoints() {
  var points = heatMapOfferData.concat(heatMapDisasterData);
  return points;

}

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

var imagePath = 'content/images/globe.png';
$scope.todos = [
{
  katsymbol : imagePath,
  what: 'Erdbeben',
  where: 'Berlin, 10823',
  when: '12.08.2016',
  notes: "Überall Wasser!"
},
{
  katsymbol : imagePath,
  what: 'Brand',
  where: 'Berlin, 12205',
  when: '12.08.2017',
  notes: "Feuer Überall!"
},
];



}
})();
