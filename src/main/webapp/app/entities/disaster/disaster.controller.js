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
            details :"Kinder sind bedroht",
            lat: "52.53961418106945",
            lng: "13.46649169921875"
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
        var citymap = {
          chicago: {
            center: {lat: 41.878, lng: -87.629},
            population: 2714856
        }
    };
    

    loadAll();

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



//init map
var heatmap,marker, map;


    navigator.geolocation.getCurrentPosition(function(position){ 
      initialize(position.coords);
      console.log($scope.disaster[0].lat+","+ $scope.disaster[0].lng);
    }, function(){
      var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
      initialize(sanFrancisco) ;
    });


    function initialize(coords) {
     var latlng = new google.maps.LatLng($scope.disaster[0].lat, $scope.disaster[0].lng);
     var myOptions = {
      zoom: 12,
      center: latlng,
      layerId: '06673056454046135537-08896501997766553811',
      disableDefaultUI : false
    };
    map = new google.maps.Map(document.getElementById('map'), myOptions);
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(document.getElementById('controllerMaps'));

           //create the heatmap
           heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatMapOfferData,
            map: map,
            radius: 60
          });
    //listener for zoom
    google.maps.event.addListener(map, 'zoom_changed', function(event) {
           changeZoom(map.getZoom());
        });     

};


//gets the points
var heatMapOfferData = [
{location: new google.maps.LatLng($scope.disaster[0].lat, $scope.disaster[0].lng), weight: 0.5}
];


//settings for dynamic zoom
function changeZoom(zoom){
  var marker = false;
  switch(zoom) {
    case 18:
        heatmap.set('radius',750);
        removeMarker();
        break;
     case 16:
        heatmap.set('radius',290);
        removeMarker();

        break;
     case 14:
        heatmap.set('radius',80);
        removeMarker();

        break;
    case 14:
        heatmap.set('radius',65);
        removeMarker();

        break;
    case 12:
        heatmap.set('radius',50);
        removeMarker();
        
        break;
    case 11:
        heatmap.set('radius',35);
        removeMarker();
        
        break;
    case 10:
        heatmap.set('radius',20);
        removeMarker();
        
        break;
    case 8:
        heatmap.set('radius',10);
        setMarker();
        break;
    case 6:
        heatmap.set('radius',5);
        setMarker();
        break;
    case 4:
        heatmap.set('radius',5);
        setMarker();
        break;

    case 2:
        heatmap.set('radius',5);
        setMarker();
        break;
    case 1:
        heatmap.set('radius',5);
        setMarker();
        break;


  }

}
 


 //set marker for dynamic zoom
function setMarker(){
  if ( marker ) {
    marker.setMap(map);
    marker.setPosition(heatMapOfferData[0].location);
      } else {
    marker = new google.maps.Marker({
      position: heatMapOfferData[0].location,
      animation: google.maps.Animation.DROP,

    });
  
  }
}

//delete marker for dynamic zoom
function removeMarker(){
  marker.setMap(null);
}

}
})();
