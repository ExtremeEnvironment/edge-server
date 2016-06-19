(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('NewdisasterController', NewdisasterController);

  NewdisasterController.$inject = ['$scope', 'Principal', 'LoginService', '$state','$window'];

  function NewdisasterController ($scope, Principal, LoginService, $state , $window ) {
    var vm = this;
    var citymap = {
      chicago: {
        center: {lat: 41.878, lng: -87.629},
        population: 2714856
      },
    };

    function greeting() {
    //createAction(lat,lon,actionType(Knowledge),user,actionObjets,disasterType(ID))
    $window.alert('Eine neue Katastrophe wurde eingetragen!');
  };
  $scope.greeting = greeting;


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
    layerId: '06673056454046135537-08896501997766553811'
  };
  map = new google.maps.Map(document.getElementById('map'), myOptions);
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(document.getElementById('controllerMaps'));




           //create the heatmap
           

//mouselistener for click event
map.addListener('click', function(event) {    
  addMarker(event.latLng);    
});       



//sets the point of the user

};


function addMarker(location) {  
  var marker = new google.maps.Marker({  
    position: location,  
    map: map  
  });  
} 


$scope.arten = [
"Erdbeben","Tsunami","Flut","Waldbrand"
];
}
})();

