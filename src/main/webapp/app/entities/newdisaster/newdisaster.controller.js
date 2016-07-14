(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('NewdisasterController', NewdisasterController);

  NewdisasterController.$inject = ['$scope', 'Principal', 'LoginService', '$state','$window','Data' ,'$mdDialog', '$mdMedia','$stateParams','$timeout'];

  function NewdisasterController ($scope, Principal, LoginService, $state , $window, Data, $mdDialog, $mdMedia, $stateParams,$timeout ) {
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
      lat:null,
      lon:null,
      title:null};

      $scope.actionDB={
        actionObjects: [],
        actionType : "KNOWLEDGE",
        description : null,
        disaster : null,
        isExpired : null,
        lat :null,
        lon : null,
        title : null,
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
            showAlert("Sie müssen einen Typ und einen Titel wählen");
          }
          else {
            console.log($scope.disasterDB)
            Data.disaster.save($scope.disasterDB);
            $state.go("home");
          }
        }
        else {
          if($scope.actionDB.disaster==null){
            showAlert("Sie müssen eine Katastrope wählen");
          }
          else {
            Data.action.save($scope.actionDB);
            $state.go("home");
          }
        }
      };

      /*-------------------------------------------Various Helper Functions-------------------------------------------------*/



      $scope.$watch('actionDB.disaster', function(current, old){
        if(current!=null){
          map.setOptions({
            center : {lat:current.lat,lng:current.lon},
            zoom: 12
          });

          circle2.setOptions({
            radius :10000,
            center : {lat:current.lat,lng:current.lat},
          });

          circle.setOptions({
            radius :250,
            center : {lat:current.lat,lng:current.lat},
            fillColor : '#AA0000',
          });

        }
      });

      $scope.getSelectedText2 = function() {
        if ( $scope.actionDB.disaster == null) {
          return "Katastrophe (Pflicht)";
        } else {
          return $scope.actionDB.disaster.title;
        }
      };

      function showAlert(text){
        $mdDialog.show(
          $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title(text)
          .ok('Ok')
          .targetEvent()
          );
      };

      $scope.$watch('selectedIndex', function(current, old){
        if(current==0){

          $timeout(function() {
            google.maps.event.trigger(map,'resize')
          }, 0);

          map.setOptions({
            center : {lat:latitude,lng:longitude},
            zoom: 12
          });

          circle2.setOptions({
            radius :10000,
            fillColor: '#AAFFFF',
            center : {lat:latitude,lng:longitude},
          });

          circle.setOptions({
            radius :250,
            center : {lat:latitude,lng:longitude},
            fillColor : '#AA0000',
          });


        }
        if(current==1){

          circle.setOptions({
            radius :10000,
            center : {lat:latitude,lng:longitude},
            fillColor : '#AA0000',
          });

          map.setOptions({
            center : {lat:latitude,lng:longitude},
            zoom: 9
          });

          circle2.setOptions({
            radius :0
          });

        }
      });



      /*--------------------------------------------------------------MAP---------------------------------------------------------*/



      var map;
      var latitude;
      var longitude;
      var circle;
      var circle2;

      navigator.geolocation.getCurrentPosition(function(position){
        latitude = position.coords.latitude;
        longitude= position.coords.longitude;
        initialize(position.coords);

      });

      function initialize(coords) {
       var  latlng = new google.maps.LatLng(latitude,longitude);
       var myOptions = {
        zoom: 11,
        center: {lat:latitude,lng:longitude}
      };
      map = new google.maps.Map(document.getElementById("map"), myOptions);

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
      });


      map.addListener('click', function(evt) {
        marker.setPosition({lat: evt.latLng.lat(), lng: evt.latLng.lng()});
        $scope.disasterDB.lat = marker.position.lat();
        $scope.disasterDB.lon = marker.position.lng();
        $scope.actionDB.lat = marker.position.lat();
        $scope.actionDB.lon = marker.position.lng();
      });

      circle = new google.maps.Circle({
        map: map,
        radius: 250,  
        fillColor: '#AA0000',
        strokeOpacity: 0.1
      });

      circle2 = new google.maps.Circle({
        map: map,
        radius: 10000,  
        fillColor: '#AAFFFF',
        strokeOpacity: 0.1
      });

      circle.bindTo('center', marker, 'position');

    };

  }
})();

