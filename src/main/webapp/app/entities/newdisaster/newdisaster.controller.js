(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('NewdisasterController', NewdisasterController);

  NewdisasterController.$inject = ['$scope', 'Principal', 'LoginService', '$state','$window','Data' ,'$mdDialog', '$mdMedia','$stateParams'];

  function NewdisasterController ($scope, Principal, LoginService, $state , $window, Data, $mdDialog, $mdMedia, $stateParams ) {
    var vm = this;
<<<<<<< HEAD
=======

    loadAlls();

    $scope.selectedIndex;
    $scope.disasters=[];
    $scope.arten = [];

    $scope.disasterDB={
      area:null,
      date:null,
      description:null,
      disasterType:null,
      isExpired:null,
      lat:36,
      lon:36,
      title:null};

      $scope.actionDB={
        actionObjects: [],
        actionType : "KNOWLEDGE",
        description : null,
        disaster : null,
        isExpired : null,
        lat :34.03,
        lon : 34.05,
        title : null,
        user: null /*$stateParams.userID*/
      };



      function loadAlls () {
        Data.disaster.query(function(result) {
         result.forEach(function (item) {
           $scope.disasters.push(item)
         })
       })
        Data.disastertype.query(function(result) {
         result.forEach(function (item) {
           $scope.arten.push(item)
         })
       })
      };

      $scope.writeDB = function() {
        if($scope.selectedIndex==1){
          if($scope.disasterDB.disasterType==null||$scope.disasterDB.title==null){
            showAlert2();
          }
          else {
            console.log($scope.disasterDB)
            Data.disaster.save($scope.disasterDB);
           //$state.go("home");
         }
       }
       else {
        if($scope.actionDB.disaster==null){
          showAlert();
        }
        else {
          Data.action.save($scope.actionDB);
          $state.go("home");
        }
      }
    };
>>>>>>> 6dd99226cf0027e48375af11e808f0a88f3fb652

    /*-------------------------------------------Various Helper Functions-------------------------------------------------*/


<<<<<<< HEAD
  var map, marker;
=======
    function showAlert(){
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Sie müssen eine Katastrope wählen')
        .ok('Ok')
        .targetEvent()
        );
    };
>>>>>>> 6dd99226cf0027e48375af11e808f0a88f3fb652

    function showAlert2(){
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Sie müssen einen Typ und einen Titel wählen')
        .ok('Ok')
        .targetEvent()
        );
    };




    /*--------------------------------------------------------------MAP---------------------------------------------------------*/


<<<<<<< HEAD
      //mouselistener for click event
      google.maps.event.addListener(map, 'click', function(event) {
           placeMarker(event.latLng);
        }); 
      

};
=======
    var map;
    var citymap = {
      chicago: {
        center: {lat: 41.878, lng: -87.629},
        population: 2714856
      },
    };

    var latitude;
    var longitude;

    navigator.geolocation.getCurrentPosition(function(position){
      latitude = position.coords.latitude;
      longitude= position.coords.longitude;
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

    var marker = new google.maps.Marker({
      map: map,
      draggable: true,
      position: {lat: latitude, lng: longitude}
    });
>>>>>>> 6dd99226cf0027e48375af11e808f0a88f3fb652

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

    google.maps.event.addListener(marker, 'dragend', function(evt){
      $scope.disasterDB.lat = marker.position.lat();
      $scope.disasterDB.lon = marker.position.lng();
      $scope.actionDB.lat = marker.position.lat();
      $scope.actionDB.lon = marker.position.lng();

<<<<<<< HEAD


$scope.removeMarker = function(){
 marker.setMap(null);
 circle.setMap(null);
}

=======
      console.log(marker.position.lat())
      console.log(marker.position.lng())
    });


  };


/*function addMarker(location) {  
  var marker = new google.maps.Marker({  
    draggable: true,
    position: location,  
    map: map,
  });  
} */

>>>>>>> 6dd99226cf0027e48375af11e808f0a88f3fb652


}
})();

