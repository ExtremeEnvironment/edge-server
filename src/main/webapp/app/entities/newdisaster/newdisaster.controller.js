(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('NewdisasterController', NewdisasterController);

  NewdisasterController.$inject = ['$scope', 'Principal', 'LoginService', '$state','$window','Data' ,'$mdDialog', '$mdMedia'];

  function NewdisasterController ($scope, Principal, LoginService, $state , $window, Data, $mdDialog, $mdMedia ) {
    var vm = this;

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
        description:null,
        disaster : null,
        isExpired : null,
        lat : 34.03,
        lon : 34.05,
        title: null,
        user: null
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
           $state.go("home");
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

    /*-------------------------------------------Various Helper Functions-------------------------------------------------*/


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


    google.maps.event.addListener(marker, 'dragend', function(evt){
      $scope.disasterDB.lat = marker.position.lat();
      $scope.disasterDB.lon = marker.position.lng();
      $scope.actionDB.lat = marker.position.lat();
      $scope.actionDB.lon = marker.position.lng();

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



}
})();

