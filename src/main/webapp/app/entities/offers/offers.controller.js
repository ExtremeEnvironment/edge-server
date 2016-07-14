(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('OffersController', OffersController);

  OffersController.$inject = ['$scope', '$state', '$timeout', '$q', '$log','Data' ,'Offers' ,'$mdDialog', '$mdMedia'];

  function OffersController ( $scope, $state, $timeout, $q, $log, Data , Offers ,$mdDialog, $mdMedia) {

    $scope.offers = [];
    $scope.locations = []

    $scope.selectedItem;
    $scope.User;

    var geocoder = new google.maps.Geocoder;

    loadAll();


    /*-----------------------------------Load Data----------------------------------&& $scope.User.login==item.user--------------------------------*/


    function loadAll() {

      Data.user.get(function(result) {
        $scope.User = result;
      });
      
      $timeout(Data.action.query(function(result) {
        result.forEach(function (item){
         if(item.actionType=='OFFER'&&item.user.id== $scope.User.id){
          $scope.offers.push(item);
          $timeout(geocodeLatLng(geocoder, map,{lat:item.lat,lng:item.lon}), 500);
        }
      })
      }), 3000);



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

      marker.setOptions({
        map: map,
        draggable: true,
        position : {lat:offer.lat,lng:offer.lon}
      });

      map.setOptions({
        center : {lat:offer.lat,lng:offer.lon},
        zoom : 10
      })
    }

    /*----------------------------------------------------------STUFF--------------------------------------------------------------*/

    function showAlert(erste,argument) {

      var confirm = $mdDialog.confirm()
      .title(erste)
      .targetEvent()
      .ok('Nein')
      .cancel('Ja');
      $mdDialog.show(confirm).then(function() {
      }, function() {
        $scope.offers.forEach( function(entry) {
          if (argument===entry) {
            $scope.offers.splice( $scope.offers.indexOf(argument), 1);
          }})
        Data.action.delete({id:argument.id});
      });
    };

    /*--------------------------------------------------------------MAP-------------------------------------------------------------*/

    var map;
    var latitude;
    var longitude;
    var circle;
    var marker;


    navigator.geolocation.getCurrentPosition(function(position){
      latitude = position.coords.latitude;
      longitude= position.coords.longitude;

      initialize(position.coords);

    });

    function initialize(coords) {
     var  latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
     var myOptions = {
      zoom: 10,
      center: latlng
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
      radius: 5000,  
      fillColor: '#66ff66',
      strokeOpacity: 0
    });

    circle.bindTo('center', marker, 'position');

  };

  function geocodeLatLng(geocoder, map, latlng) {
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          $scope.locations.push(results[1]);
        } else {
          window.alert('Bitte Seite neuladen!');
        }
      } else {
       if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {    
        setTimeout(function() {
          geocodeLatLng(latlng);
        }, 1000);}
        else {
          window.alert('Bitte Seite neuladen!');
        }
      }
    });
  }


}

})();

