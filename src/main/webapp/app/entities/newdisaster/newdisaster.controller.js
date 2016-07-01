(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('NewdisasterController', NewdisasterController);

  NewdisasterController.$inject = ['$scope', 'Principal', 'LoginService', '$state','$window'];

  function NewdisasterController ($scope, Principal, LoginService, $state , $window ) {
    var vm = this;

    function greeting() {
    //createAction(lat,lon,actionType(Knowledge),user,actionObjets,disasterType(ID))
    $window.alert('Eine neue Katastrophe wurde eingetragen!');
  };
  $scope.greeting = greeting;


  var map, marker;

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




      //mouselistener for click event
      google.maps.event.addListener(map, 'click', function(event) {
           placeMarker(event.latLng);
        }); 
      

};

//place the marker
function placeMarker(location) {
  if ( marker ) {
    marker.setMap(map);
    circle.setMap(map);
    marker.setPosition(location);
    console.log(marker.getPosition());
    
      } else {
    marker = new google.maps.Marker({
      position: location,
      draggable: true,
      animation: google.maps.Animation.DROP,

    });


    marker.addListener('dragend',function(event) {
        console.log(event.latLng.lat());
        console.log(event.latLng.lng());
    });

    circle = new google.maps.Circle({
        map: map,
        radius: 1609,    // 1 miles in metres
        fillColor: '#FF0000',
        fillOpacity: 0.2,
       strokeColor: '#FF0000',
        strokeOpacity: 0.1

});
    circle.bindTo('center', marker, 'position');
    circle.addListener('radius_changed', function(event){
      console.log(this.radius);
        

    })
    marker.setMap(map);
  }
}




$scope.removeMarker = function(){
 marker.setMap(null);
 circle.setMap(null);
}



$scope.arten = [
"Erdbeben","Tsunami","Flut","Waldbrand"
];
}
})();

