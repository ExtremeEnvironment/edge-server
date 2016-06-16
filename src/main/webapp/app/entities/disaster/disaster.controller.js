(function() {
    'use strict';

    angular
    .module('edgeServerApp')
    .controller('DisasterController', DisasterController);

    DisasterController.$inject = ['$scope', '$state', 'Disaster'];

    function DisasterController ($scope, $state, Disaster) {
        var vm = this;
        $scope.disaster = [
        {
            art: 'Erdbeben',
            date: '12.08.2016',
            title: "Überall Wasser!",
            details :"Kinder sind bedroht"
        }
        ];
        $scope.messages = [
        {
            text: 'Erdbeben',
            user: 'Hans',
        },
        {
            text: 'Feuer',
            user: 'Olaf',
        },
        ];
        var citymap = {
          chicago: {
            center: {lat: 41.878, lng: -87.629},
            population: 2714856
        }
    };
    initMap();

    vm.disasters = [];

    loadAll();

    function loadAll() {
        Disaster.query(function(result) {
            vm.disasters = result;
            console.log(result)
        });
    }
    function initMap() {
        // Create the map.
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: {lat: 37.090, lng: -95.712},
          mapTypeId: google.maps.MapTypeId.TERRAIN
      });

        // Construct the circle for each value in citymap.
        // Note: We scale the area of the circle based on the population.
        for (var city in citymap) {
          // Add the circle for this city to the map.
          var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            editable: true,
            center: citymap[city].center,
            radius: Math.sqrt(citymap[city].population) * 100
        });
          google.maps.event.addListener(cityCircle, 'radius_changed', function() {
            console.log(cityCircle.getRadius());
        });
          google.maps.event.addListener(cityCircle, 'center_changed', function() {
            console.log(cityCircle.getCenter());
            console.log('Bounds changed.');
        });
      }

  }
}


})();
