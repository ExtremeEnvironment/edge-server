(function() {
    'use strict';

    angular
    .module('edgeServerApp')
    .controller('DisasterController', DisasterController);

    DisasterController.$inject = ['$scope', '$state', 'Disaster'];

    function DisasterController ($scope, $state, Disaster) {
        var vm = this;
<<<<<<< HEAD

=======
>>>>>>> origin/Linus-Edge
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
<<<<<<< HEAD
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
=======
        ];
        var citymap = {
          chicago: {
            center: {lat: 41.878, lng: -87.629},
            population: 2714856
        }
    };
    initMap();
>>>>>>> origin/Linus-Edge

    vm.disasters = [];

    loadAll();

<<<<<<< HEAD
/*    function loadAll() {
=======
    function loadAll() {
>>>>>>> origin/Linus-Edge
        Disaster.query(function(result) {
            vm.disasters = result;
            console.log(result)
        });
<<<<<<< HEAD
    }*/

    function loadAll() {
    // get all data from DB
    var allItems= 'Schmerzmittel, Antibiotika, Verbände, Baby-Nahrung, Supplements, Wasser, Standardessen, Holz, Stein, Sand, Zelt, Betten, Jacken, Hosen, Schuhe';
    $scope.categories = [
    "Medizin","Nahrung","Baumaterialien","Unterkunft","Kleidung"];
    $scope.topList=[  {name:'Schmerzmittel' , category:'Medizin'},
    {name:'Antibiotika' , category:'Medizin'},
    {name:'Verbände' , category:'Medizin'},
    {name:'Baby-Nahrung' , category:'Nahrung'},
    {name:'Supplements' ,   category:'Nahrung'},
    {name:'Wasser' , category:'Nahrung'},
    {name:'Standardessen' , category:'Nahrung'},
    {name:'Holz' , category:'Baumaterialien'},
    {name:'Stein' , category:'Baumaterialien'},
    {name:'Sand' , category:'Baumaterialien'}];
}
var map;

navigator.geolocation.getCurrentPosition(function(position){ 
  initialize(position.coords);
}, function(){
  var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
  initialize(sanFrancisco) ;
});

function initialize(coords) {
   var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
   var myOptions = {
      zoom: 8,
      center: latlng,
      layerId: '06673056454046135537-08896501997766553811'
  };
  map = new google.maps.Map(document.getElementById('map'), myOptions);
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(document.getElementById('controllerMaps'));



//mouselistener for click event
map.addListener('click', function(event) {    
  addMarker(event.latLng);    
});       

};


function addMarker(location) {  
  var marker = new google.maps.Marker({  
    position: location,  
    map: map  
});  
  markers.push(marker);
} 

$scope.removeMarker = function(){
  markers = [];
}

}
=======
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

>>>>>>> origin/Linus-Edge

})();
