(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('NewdisasterController', NewdisasterController);

  NewdisasterController.$inject = ['$scope', 'Principal', 'LoginService', '$state','$window','Data' ,'$mdDialog', '$mdMedia','$stateParams'];

  function NewdisasterController ($scope, Principal, LoginService, $state , $window, Data, $mdDialog, $mdMedia, $stateParams ) {
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

          circle.setOptions({
            radius :1000,
            fillColor : '#AA0000',
          });

          map.setOptions({
            zoom: 12
          });

        }
        if(current==1){

          circle.setOptions({
            radius :50000,
            fillColor : '#AA0000',
          });

          map.setOptions({
            zoom: 8
          });

        }
      });



      /*--------------------------------------------------------------MAP---------------------------------------------------------*/



      var map;

      var latitude;
      var longitude;
      var circle;

      navigator.geolocation.getCurrentPosition(function(position){
        latitude = position.coords.latitude;
        longitude= position.coords.longitude;
        initialize(position.coords);

      });

      function initialize(coords) {
       var  latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
       var myOptions = {
        zoom: 8,
        center: latlng,
        layerId: '06673056454046135537-08896501997766553811'
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

        console.log(marker.position.lat())
        console.log(marker.position.lng())
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
        radius: 1000,  
        fillColor: '#AA0000',
        strokeOpacity: 0.1
      });
      circle.bindTo('center', marker, 'position');

    };

  }
})();

