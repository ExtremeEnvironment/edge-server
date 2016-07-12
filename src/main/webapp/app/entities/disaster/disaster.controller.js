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

    $scope.knowledge;


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
    $scope.topten= Data.topten.query({id : $stateParams.disasterID})

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

           //create the heatmap
           heatmap = new google.maps.visualization.HeatmapLayer({
            data: getHeatMapPoints(),
            map: map,
            radius: 60
          });
  Data.actionHeatMap.query({id : $stateParams.disasterID},function(result){
          result.forEach(function (action){
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
                 var markers = new google.maps.Marker({
                      position: (new google.maps.LatLng(action.lat, action.lon)),
                      map: map,
                      title: action.title,
                      id : action.id,
                  })
                  markers.addListener('click', function() {
                      $scope.knowledge = Data.action.get({id:action.id});

                  });

              }
          })})
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
  ;


//mouselistener for click event





//sets the point of the user


};


function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });

}

//sets the points
$scope.allHeatMapData = function(){
  heatmap.setData(getHeatMapPoints());
}

$scope.disasterHeatMapData = function(){
  heatmap.setData(heatMapDisasterData);
}

$scope.offerHeatMapData = function(){
  heatmap.setData(heatMapOfferData);
}

function getHeatMapPoints() {
  var points = heatMapOfferData.concat(heatMapDisasterData);
  return points;

}

// set of data for heatmap
var heatMapDisasterData = [
{location: new google.maps.LatLng(37.782, -122.447), weight: 0.2}
];

var heatMapOfferData = [
{location: new google.maps.LatLng(38.782, -124.447), weight: 0.2}
];


  }})();

