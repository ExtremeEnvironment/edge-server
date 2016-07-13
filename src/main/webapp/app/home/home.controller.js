(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Data'];

  function HomeController ($scope, Principal, LoginService, $state, Data ) {
    var vm = this;
    var moment;

    $scope.disasters=[];
    $scope.heatMapPoints=[];
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
        vm.isAuthenticated = Principal.isAuthenticated;
      });
    }

    function register () {
      $state.go('register');
    }


    function loadAlls () {
      Data.disaster.query(function(result) {
       result.forEach(function (item) {
         $scope.heatMapPoints.push({location: new google.maps.LatLng(item.lat, item.lon), weight : 6});
         loadDisasterHeatMap(item.id);
         $scope.disasters.push(item)
       })
     })}


      $scope.loadDisaster= function(id){
        $scope.disasters.forEach(function (argument) {
          if (argument.id == id) {
            map.setOptions({
              center : ({lat:argument.lat,lng:argument.lon}),
              zoom : 8 
            })
          }
        });
      };

      $scope.allDisaster= function(){
        map.setOptions({
          center : (moment),
          zoom : 3 
        })
      };

      /*-----------------------------------------MAP-------------------------------------------------------------------------------*/

      var heatmap;
      var map;
      var markers = [];

      navigator.geolocation.getCurrentPosition(function(position){
        initialize(position.coords);
      });

      function initialize(coords) {
       var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
       var myOptions = {
        zoom: 3,
        center: latlng,
        disableDefaultUI : false
      };
      map = new google.maps.Map(document.getElementById('map'), myOptions);

      heatmap = new google.maps.visualization.HeatmapLayer({
        data: $scope.heatMapPoints,
        map: map,
        radius: 40,
      });

      moment = latlng;
    };

    function loadDisasterHeatMap (id) {
      Data.actionHeatMap.query({id : id},function(result){
        result.forEach(function (action){
          $scope.heatMapPoints.push({location: new google.maps.LatLng(action.lat, action.lon), weight : 0.1});
        })});
    };

  }
})();
