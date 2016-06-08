(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('NewdisasterController', NewdisasterController);

  NewdisasterController.$inject = ['$scope', 'Principal', 'LoginService', '$state','$window'];

  function NewdisasterController ($scope, Principal, LoginService, $state , $window ) {
    var vm = this;
    var citymap = {
      chicago: {
        center: {lat: 41.878, lng: -87.629},
        population: 2714856
      },
    };

    function greeting() {
    //createAction(lat,lon,actionType(Knowledge),user,actionObjets,disasterType(ID))
     $window.alert('Eine neue Katastrophe wurde eingetragen!');
   };
   $scope.greeting = greeting;

   initMap();

   function initMap() {
        // Create the map.
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: {lat: 37.090, lng: -95.712},
          mapTypeId: google.maps.MapTypeId.TERRAIN
        });

        var drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.MARKER,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
            google.maps.drawing.OverlayType.CIRCLE,
            ]
          },
          markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
          circleOptions: {
            fillColor: '#FF0000',
            fillOpacity: 0.1,
            strokeWeight: 1,
            clickable: true,
            editable: true,
            zIndex: 1,
            map : map
          }
        });
        drawingManager.setMap(map);

        google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle) {
          var radius = circle.getRadius();
          console.log(radius)
        });

      }


      $scope.arten = [
      "Erdbeben","Tsunami","Flut","Waldbrand"
      ];




      var imagePath = 'content/images/logo-jhipster.png';
      $scope.todos = [
      {
        katsymbol : imagePath,
        what: 'Erdbeben',
        where: 'Berlin, 10823',
        when: '12.08.2016',
        notes: "Überall Wasser!"
      },
      {
        katsymbol : imagePath,
        what: 'Brand',
        where: 'Berlin, 12205',
        when: '12.08.2017',
        notes: "Feuer Überall!"
      },
      ];



    }
  })();

