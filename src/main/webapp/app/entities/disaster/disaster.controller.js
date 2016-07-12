(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('DisasterController', DisasterController);

  DisasterController.$inject = ['$scope', '$state', 'Data', '$stateParams','Principal'];

  function DisasterController ($scope, $state, Data,  $stateParams, Principal) {
    var vm = this;


    loadAlls();

    $scope.topten;
    $scope.disaster;
    $scope.answer=false;
    $scope.markers =[];



    $scope.changeAnswer = function (item) {
      /*     $scope[item]=true;*/
      if($scope[item]==true)
      {
        $scope[item]=false;
      }else {
       $scope[item]=true;
     }
   }

   $scope.showAnswers = function (index) {
     $scope['answer_'+ index];
     if($scope['answer_'+ index] == true)
     {
       $scope['answer_'+ index] = false;
     }else {
      $scope['answer_'+ index] = true;
    }
  }
  $scope.send = function (item) {
    $scope[item]=false;
  }


  function loadAlls () {

    $scope.disaster = Data.disaster.get({id : $stateParams.disasterID});
    $scope.topten= Data.topten.query({id : $stateParams.disasterID});
    $scope.topTenKnow = Data.knowTopTen.query({id : $stateParams.disasterID});
   $scope.disasterAction = Data.actionHeatMap.query({id : $stateParams.disasterID});

  }

  $scope.messages = [
  {
    text: 'Duo at aliquid mnesarchum, nec ne impetus hendrerit. Ius id aeterno debitis atomorum, et sed feugait voluptua, brute tibique no vix. Eos modo esse ex, ei omittam imperdiet pro. Vel assum albucius incorrupte no.',
    user: 'Hans',
  },
  {
    text: 'Feuer',
    user: 'Olaf',
  },
  {
    text: 'Erdbeben',
    user: 'Hans',
  },
  {
    text: 'Feuer',
    user: 'Olaf',
  },
  {
    text: 'Erdbeben',
    user: 'Hans',
  },
  {
    text: 'Feuer',
    user: 'Olaf',
  },
  {
    text: 'Feuer',
    user: 'Olaf',
  },
  {
    text: 'Feuer',
    user: 'Olaf',
  },
  {
    text: 'Feuer',
    user: 'Olaf',
  },
  {
    text: 'Feuer',
    user: 'Olaf',
  }
  ];


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
    zoom: 8,
    center: latlng,
    layerId: '06673056454046135537-08896501997766553811',
    disableDefaultUI : false
  };
  map = new google.maps.Map(document.getElementById('map'), myOptions);
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(document.getElementById('controllerMaps'));



$scope.disasterAction.forEach(function (action){
              if(action.actionType == "SEEK"){
                 var circle = new google.maps.Circle({
                      map: map,
                      radius: 3000,
                      fillColor: '#FF4000',
                      strokeOpacity: 0.2,
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
                  });
                  $scope.markers.push(marker);
              }
          });

      Data.action.query(function(result){
          result.forEach(function (action) {
              if (action.actionType == "OFFER") {
                  var circle2 = new google.maps.Circle({
                      map: map,
                      radius: 3000,
                      fillColor: '#0040FF',
                      strokeOpacity: 0.2,
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
    $scope.topTenKnow.forEach(function (action){
              var marker = new google.maps.Marker({
                  position: (new google.maps.LatLng(action.lat, action.lon)),
                  map: map,
                  title: action.title,
              });
              marker.addListener('click', function() {
                  $scope.knowledge = Data.action.get({id:action.id});
              });
             $scope.markers.push(marker);
          });
    console.log("Top-Ten Marker;")
      };

$scope.allMarker = function(){
    removeMarker();
    $scope.disasterAction.forEach(function (action){
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
    console.log("all Marker;")
};





  }})();

