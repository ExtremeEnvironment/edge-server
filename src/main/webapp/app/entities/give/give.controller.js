(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('GiveController', GiveController);

  GiveController.$inject = ['$scope', '$state', '$timeout', '$q', '$log','Give'];

  function GiveController ( $scope, $state, $timeout, $q, $log,Give) {

    $scope.filters = { };

    var selectedItems=['Holz'];
    $scope.selectedItems= selectedItems;

    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
        // list of `state` value/display objects
        self.Items      = loadAll();
        self.querySearch   = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange   = searchTextChange;
        self.newItem = newItem;
        function newItem(Item) {
          alert("Sorry! You'll need to create a Constituion for " + Item + " first!");
        };
        function querySearch (query) {
          var results = query ? self.Items.filter( createFilterFor(query) ) : self.Item,
          deferred;
          if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;
          } else {
            return results;
          }
        }
        function searchTextChange(text) {
          $log.info('Text changed to ' + text);
        }
        function selectedItemChange(item) {
          var value = item.display;
          $scope.pushToArray(value);
        }


        $scope.pushToArray = function (item){  
         var marker; 
         selectedItems.forEach( function(entry) {
           if (entry===item) {
            marker = 1;
          }})
         if (marker===1) {
          return
        }
        selectedItems.push(item);
        $log.info(selectedItems);
      };

      $scope.delFromArray = function (item){  
       var marker; 
       selectedItems.forEach( function(entry) {
         if (entry===item) {
           selectedItems.splice(selectedItems.indexOf(item), 1);
         }})
     };

     loadAll();

     function loadAll() {
      Give.query(function(result) {
        console.log(result)
      });
    }

    $scope.loadAll = function () {
      Give.query(function(result) {
        console.log(result)
      });
    }

    $scope.writeDB = function (){
      Give.save({lat:'1',lon:'1',actionType:'KNOWLEDGE'});
    }


    $scope.selectedItem;
    $scope.getSelectedText = function() {
      if ($scope.selectedItem !== undefined) {
        return ($scope.selectedItem.what+" |  "+$scope.selectedItem.where+"  |  "+$scope.selectedItem.notes);
      } else {
        return "Please select an item";
      }
    };


    function loadAll() {
    // get all data from DB
    var allItems= 'Schmerzmittel, Antibiotika, Verbände, Baby-Nahrung, Supplements, Wasser, Standardessen, Holz, Stein, Sand, Zelt, Betten, Jacken, Hosen, Schuhe';
    $scope.categories = [
    "Medizin","Nahrung","Baumaterialien","Unterkunft","Kleidung"];
    $scope.items=[  {name:'Schmerzmittel' , category:'Medizin'},
    {name:'Antibiotika' , category:'Medizin'},
    {name:'Verbände' , category:'Medizin'},
    {name:'Baby-Nahrung' , category:'Nahrung'},
    {name:'Supplements' ,   category:'Nahrung'},
    {name:'Wasser' , category:'Nahrung'},
    {name:'Standardessen' , category:'Nahrung'},
    {name:'Holz' , category:'Baumaterialien'},
    {name:'Stein' , category:'Baumaterialien'},
    {name:'Sand' , category:'Baumaterialien'},
    {name:'Hose' , category:'Kleidung'},
    {name:'Schuhe' , category:'Kleidung'},
    {name:'Jacke' , category:'Kleidung'},
    {name:'Bett' , category:'Unterkunft'},
    {name:'Zelt' , category:'Unterkunft'}];
    return allItems.split(/, +/g).map( function (item) {
      return {
        value: item.toLowerCase(),
        display: item
      };
    });
  }

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
  {
    katsymbol : imagePath,
    what: 'Hallejuliua',
    where: 'Berlin, 12205',
    when: '12.08.2017',
    notes: "Feuer Überall!"
  },
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
  {
    katsymbol : imagePath,
    what: 'Hallejuliua',
    where: 'Berlin, 12205',
    when: '12.08.2017',
    notes: "Feuer Überall!"
  }
  ];

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(Item) {
      return (Item.value.indexOf(lowercaseQuery) === 0);
    };
  }
  this.infiniteItems = {
    numLoaded_: 0,
    toLoad_: 0,
          // Required.
          getItemAtIndex: function(index) {
            if (index > this.numLoaded_) {
              this.fetchMoreItems_(index);
              return null;
            }
            return index;
          },
          // Required.
          // For infinite scroll behavior, we always return a slightly higher
          // number than the previously loaded items.
          getLength: function() {
            return this.numLoaded_ + 5;
          },
          fetchMoreItems_: function(index) {
            // For demo purposes, we simulate loading more items with a timed
            // promise. In real code, this function would likely contain an
            // $http request.
            if (this.toLoad_ < index) {
              this.toLoad_ += 20;
              $timeout(angular.noop, 300).then(angular.bind(this, function() {
                this.numLoaded_ = this.toLoad_;
              }));
            }
          }
        };


//init map
        var map, marker, circle;

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
      google.maps.event.addListener(map, 'click', function(event) {
           placeMarker(event.latLng);
        }); 
      

};

//place the marker
function placeMarker(location) {
  if ( marker ) {
    marker.setMap(map);
    circle.setMap(map);
    marker.setPosition(location);
      } else {
    marker = new google.maps.Marker({
      position: location,
      draggable: true,
      animation: google.maps.Animation.DROP,

    });


    marker.addListener('dragend',function(event) {
        console.log(event.latLng.lat());
        console.log(event.latLng.lng());
    });

    circle = new google.maps.Circle({
        map: map,
        radius: 1609,    // 1 miles in metres
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        strokeColor: '#FF0000',
        strokeOpacity: 0.1

});
    circle.bindTo('center', marker, 'position');
    marker.setMap(map);
  }
}


//remove marker
$scope.removeMarker = function(){
 marker.setMap(null);
 circle.setMap(null);
}


}
})();
