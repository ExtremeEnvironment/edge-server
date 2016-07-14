(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('DisasterController', DisasterController);

  DisasterController.$inject = ['$scope', '$state', 'Data', '$stateParams','Principal', 'Message','$mdDialog', '$mdMedia','$q', '$timeout'];

  function DisasterController ($scope, $state, Data,  $stateParams, Principal,Message,$mdDialog, $mdMedia,$q, $timeout) {
    var vm = this;
    var disasterAction;
    var topTenKnow;
    var dID =  $stateParams.disasterID;


    loadAlls();

    $scope.topten;
    $scope.disaster;
    $scope.answer=false;
    $scope.markers =[];

    $scope.actions=[];

    $scope.message={messageText : null};
    $scope.messages=[];
    $scope.User;
    $scope.knowledge;


    $scope.send = function (item) {
      $scope[item]=false;
    }


    function loadAlls () {

      $scope.disaster = Data.disaster.get({id : dID});

      Message.messages.query({id : dID},function (argument) {
       argument.forEach(function (item) {
        $scope.messages.push(item);
        console.log(item);
      })
     })
      Data.action.query(function (argument) {
       argument.forEach(function (item) {
        $scope.actions.push(item)              
      })
     });
      Message.user.get(function(result) {
        $scope.User = result;
        console.log(result)
      });
      $scope.topten= Data.topten.query({id : dID});
      topTenKnow = Data.knowTopTen.query({id : dID});
      disasterAction = Data.actionHeatMap.query({id : dID},function (argument) {
       argument.forEach(function (item) {
         console.log(item)
       })
     });

    }


    $scope.send =  function () {
      if ($scope.message.messageText==null) {
        showAlert2("Bitte eine Nachricht eingeben")
      } else {
        $scope.messages.push({messageText: $scope.message.messageText, messageUser:  $scope.User.login , messageDate: "Gerade"});

        var letsgo =function () {
         $timeout(function () {
           $scope.message.messageText=null
         }, 500);
       }

       var thirdFn = function() {
        var deferred = $q.defer();
        if(Message.newmessage.save({conversationId: $stateParams.disasterID},$scope.message)){
          deferred.resolve;
        }
        return deferred.promise;
      }

      thirdFn().then(letsgo());

    }

  }

  function showAlert2(text){
    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title(text)
      .ok('Ok')
      .targetEvent()
      );
  };

  $scope.like = function(lid){
    console.log(lid)
    Data.likes.update({id:lid});
  };



  /*----------------------------------------------MAP---------------------------------------------------------*/



  var heatmap;
  var map;


  navigator.geolocation.getCurrentPosition(function(position){
    initialize(position.coords);
  }, function(){
    var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
    initialize(sanFrancisco) ;
  });

  function initialize(coords) {
   var latlng = new google.maps.LatLng($scope.disaster.lat, $scope.disaster.lon);
   var myOptions = {
    zoom: 9,
    center: latlng,
  };
  map = new google.maps.Map(document.getElementById('map'), myOptions);
  map.controls[google.maps.ControlPosition.BOTTOM].push(document.getElementById('controllerMaps'));


  disasterAction.forEach(function (action){
    if(action.actionType == "SEEK"){
     var circle = new google.maps.Circle({
      map: map,
      radius: 5000,
      fillColor: '#FF4000',
      strokeOpacity: 0,
      center: (new google.maps.LatLng(action.lat, action.lon))

    })
   }
   if(action.actionType == "KNOWLEDGE"){
     var marker = new google.maps.Marker({
      position: (new google.maps.LatLng(action.lat, action.lon)),
      map: map,
      title: action.title,
    });
     marker.addListener('click', function() {
      $scope.knowledge = Data.action.get({id:action.id});
      console.log( $scope.knowledge)
    });
     $scope.markers.push(marker);
   }
 });

  Data.action.query(function(result){
    result.forEach(function (action) {
      if (action.actionType == "OFFER") {
        var circle2 = new google.maps.Circle({
          map: map,
          radius: 5000,
          fillColor: '#66ff66',
          strokeOpacity: 0,
          center: (new google.maps.LatLng(action.lat, action.lon))
        })
      }
    })});

};


function removeMarker(){
 $scope.markers.forEach(function(marker){
   marker.setMap(null);
 })
 $scope.markers = [];
}

$scope.topTenMarker = function(){
  removeMarker();
  topTenKnow.forEach(function (action){
    var marker = new google.maps.Marker({
      position: (new google.maps.LatLng(action.lat, action.lon)),
      map: map,
      title: action.title,
    });
    marker.addListener('click', function() {
      $scope.knowledge = Data.action.get({id:action.id});
      console.log( $scope.knowledge)
    });
    $scope.markers.push(marker);
  });
  console.log("Top-Ten Marker")
};

$scope.allMarker = function(){
  removeMarker();
  disasterAction.forEach(function (action){
    if(action.actionType == "KNOWLEDGE"){
      var marker = new google.maps.Marker({
        position: (new google.maps.LatLng(action.lat, action.lon)),
        map: map,
        title: action.title,
      });
      marker.addListener('click', function() {
        $scope.knowledge = Data.action.get({id:action.id});
      });
      $scope.markers.push(marker);
    }
  })
  console.log("all Marker")
};





}})();

