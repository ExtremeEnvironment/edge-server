(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('OffersController', OffersController);

  OffersController.$inject = ['$scope', '$state', '$timeout', '$q', '$log','Data'];

  function OffersController ( $scope, $state, $timeout, $q, $log, Data) {

    $scope.filters = { };
    var self = this;


    /*-----------------------------------Search Bar Implementation------------------------------------------------------------------*/

    self.simulateQuery = false;
    self.isDisabled    = false;
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
      if (text=='')
      {
        $scope.filters.location = '';
      };
    }

    /*
      Description:
      Selected item is used to set a filter to the location of the action
      */

      function selectedItemChange(item) {
       if (item!=null)
       {
         var value = item.display;
         $scope.filters.location = value;
       };

     }

     /*-----------------------------------------------------------------------------------------------------------*/

     $scope.pushToArrays = function (item){  
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

    var selectedItem;
    $scope.selectedItem = selectedItem;

    $scope.pushToArray = function (item){  
      $scope.selectedItem = item;
      selectedItem = $scope.selectedItem;
    };

    $scope.offers = []

    function loadAll() {
      Data.action.query(function(result) {
        result.forEach(function (item){
          if(item.actionType=='OFFER'){
            $scope.offers.push(item);
          }
        })
      });
    }


    $scope.delFromArray = function (item){  
      listOffers.forEach( function(entry) {
        if (item.$$hashKey===entry.$$hashKey) {

         listOffers.splice(listOffers.indexOf(item), 1);
       }})
    };

    $scope.delFromObjects = function (item){  
      selectedItem.actionObjects.forEach( function(entry) {
        if (item===entry) {
          selectedItem.actionObjects.splice( selectedItem.actionObjects.indexOf(item), 1);
        }})
    };    


    $scope.writeDB = function (){

    }

    $scope.propertyName = 'age';
    $scope.reverse = true;

    $scope.sortBy = function(propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
    };

    $scope.saveToDB = function  () {
     $uibModalInstance.close();
     console.log('HALP')
   }

   function loadAlls() {
    // get all data from DB
    var stadte = 'Berlin, Munchen, Dortmund, Koeln, Hamburg, Nuernberg, Leipzig, Erfurt';

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
    return stadte.split(/, +/g).map( function (item) {
      return {
        value: item.toLowerCase(),
        display: item
      };
    });
  }

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

        var heatmap;

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

//mouselistener for click event
map.addListener('click', function(event) {    
  addMarker(event.latLng);    
});       




//sets the point of the user
var marker = new google.maps.Marker({
  position: latlng, 
  map: map, 
}); 
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
{location: new google.maps.LatLng(52.520645, 13.409779), weight: 0.2}
];

var heatMapOfferData = [
{location: new google.maps.LatLng(52.520645, 13.409779), weight: 0.2}
];

}
})();

