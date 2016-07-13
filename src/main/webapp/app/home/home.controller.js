(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Data'];

  function HomeController ($scope, Principal, LoginService, $state, Data ) {
    var vm = this;

    $scope.disasters=[];
    $scope.imagePath="content/images/globe.png"


    vm.account = null;
    vm.isAuthenticated = null;
    vm.login = LoginService.open;
    vm.register = register;
    $scope.$on('authenticationSuccess', function() {
      getAccount();
    });



    getAccount();

    loadAlls();

    function getAccount() {
      Principal.identity().then(function(account) {
        vm.account = account;
        console.log(account)
        vm.isAuthenticated = Principal.isAuthenticated;
      });
    }

    function register () {
      $state.go('register');
    }


    function loadAlls () {
      Data.disaster.query(function(result) {
       result.forEach(function (item) {
         $scope.disasters.push(item)
         console.log(item)
       })
     })}

      /*-----------------------------------------MAP-------------------------------------------------------------------------------*/

      var heatmap;
      var map;
      var markers = [];
      $scope.heatMapPoints=[];

      navigator.geolocation.getCurrentPosition(function(position){
        initialize(position.coords);
      }, function(){
        var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
        initialize(sanFrancisco) ;
      });

      function initialize(coords) {
       var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
       var myOptions = {
        zoom: 3,
        center: latlng,
        layerId: '06673056454046135537-08896501997766553811',
        disableDefaultUI : false
      };
      map = new google.maps.Map(document.getElementById('map'), myOptions);

           //create the heatmap
           heatmap = new google.maps.visualization.HeatmapLayer({
            data: $scope.heatMapPoints,
            map: map,
            radius: 50,
          });
           $scope.heatMapPoints = [];

/*     //listener for zoom
     google.maps.event.addListener(map, 'zoom_changed', function(event) {
       changeZoom(map.getZoom());
     });*/

   };

//sets the points


$scope.disasterHeatMapData = function(){

  $scope.loadHeatMap();
  console.log($scope.heatMapPoints);
}

$scope.offerHeatMapData = function(){
  heatmap.setData(heatMapOfferData);
}

function getHeatMapPoints() {
  var points = heatMapOfferData.concat(heatMapDisasterData);
  return points;

}

//load special disaster
$scope.loadDisaster= function(id){
  $scope.disasters.forEach(function (argument) {
    if (argument.id == id) {
      map.setCenter({lat:argument.lat,lng:argument.lon});
    }
  });
};

$scope.loadDisasterHeatMap= function(id){

  Data.actionHeatMap.query({id : id},function(result){
    result.forEach(function (action){
      console.log(action.lat,action.lon);
      $scope.heatMapPoints.push({location: new google.maps.LatLng(action.lat, action.lon), weight : 1});
    })});

};

$scope.loadHeatMap = function(){

  Data.disaster.query(function(result){
    result.forEach(function(disaster){
     $scope.heatMapPoints.push({location: new google.maps.LatLng(disaster.lat, disaster.lon), weight : 6});
     $scope.loadDisasterHeatMap(disaster.id);
   })});
};

}
})();
