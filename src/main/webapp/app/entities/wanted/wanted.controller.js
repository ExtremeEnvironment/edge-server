(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('WantedController', WantedController);

  WantedController.$inject = ['$scope', '$state', '$timeout', '$q', '$log','Data' ,'Offers','$mdDialog', '$mdMedia'];

  function WantedController ( $scope, $state, $timeout, $q, $log, Data , Offers, $mdDialog, $mdMedia) {

    $scope.offers = []

    $scope.selectedItem;
    $scope.User;

    loadAll();


    /*-----------------------------------Load Data------------------------------------------------------------------*/


    function loadAll() {
      Data.user.get(function(result) {
        $scope.User = result;
      });


      $timeout(Data.action.query(function(result) {
        result.forEach(function (item){
          if(item.actionType=='SEEK'&&item.user.id== $scope.User.id){
            console.log(item)
            $scope.offers.push(item);
          }
        })
      }), 2000);

    }

    /*---------------------------------------------Modify items in the system-------------------------------------------*/



    $scope.delFromArray = function (argument) {
      showAlert("Sicher das sie das Angebot löschen wollen?",argument)
    }


    $scope.writeDB = function (){
      Data.action.update($scope.selectedItem);
    }


    $scope.pushToArray = function (offer) {
      $scope.selectedItem = offer; 

      circle2.setOptions({
        radius: 100000,  
        fillColor: '#AA00FF',
        strokeOpacity: 0,
        position : {lat:offer.disaster.lat,lng:offer.disaster.lon}
      });

      marker.setOptions({
        map: map,
        draggable: true,
        position : {lat:offer.lat,lng:offer.lon}
      });

      map.setOptions({
        center : {lat:offer.lat,lng:offer.lon},
        zoom : 8
      })
    }

    $scope.writeDB = function (){   
      Data.action.update($scope.selectedItem.id,$scope.selectedItem);
    }


    /*-----------------------------------------------------STUFF-----------------------------------------------*/

    function showAlert(erste,argument) {

      var confirm = $mdDialog.confirm()
      .title(erste)
      .targetEvent()
      .ok('Nein')
      .cancel('Ja');
      $mdDialog.show(confirm).then(function() {
        console.log('NEIN')
      }, function() {
        $scope.offers.forEach( function(entry) {
          if (argument===entry) {
            $scope.offers.splice( $scope.offers.indexOf(argument), 1);
          }})
        Data.action.delete({id:argument.id});
      });
    };

    /*-----------------------------------------------------MAP-----------------------------------------------*/




    var map;
    var latitude;
    var longitude;
    var marker;
    var circle;
    var circle2;

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

    marker = new google.maps.Marker({
    });



    google.maps.event.addListener(marker, 'dragend', function(evt){
      $scope.selectedItem.lat = marker.position.lat();
      $scope.selectedItem.lon = marker.position.lng();

    });

    map.addListener('click', function(evt) {
      marker.setPosition({lat: evt.latLng.lat(), lng: evt.latLng.lng()});
      $scope.selectedItem.lat = evt.latLng.lat();
      $scope.selectedItem.lon = evt.latLng.lng();

    });

    circle = new google.maps.Circle({
      map: map,
      radius: 25000,  
      fillColor: '#AA0000',
      strokeOpacity: 0

    });

    circle2 = new google.maps.Circle({
      map: map,
      radius: 100000,  
      fillColor: '#AA00FF',
      strokeOpacity: 0,
      center :  {lat:55,lng:55}
    });


    circle.bindTo('center', marker, 'position');
    

  };
}
})();

