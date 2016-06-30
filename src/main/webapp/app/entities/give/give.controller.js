(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('GiveController', GiveController);

  GiveController.$inject = ['$scope', '$state', '$timeout', '$q', '$log' ,'Search',  '$mdDialog', '$mdMedia'];

  function GiveController ( $scope, $state, $timeout, $q, $log, Search,  $mdDialog, $mdMedia) {

    $scope.filters = { };
    $scope.itemToDB={
      actionObjects: [],
      actionType : "OFFER",
      isExpired : null,
      lat :34.03,
      lon : 34.05,
      user: null
    };

    $scope.allObjects=[];
    $scope.allCategories=[];

    var actionString = null;

    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    self.Items      = loadAllItems();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.newItem = newItem;

    function newItem(Item) {
      alert("Sorry! You'll need to create a Constituion for " + Item + " first!");
    };

    function querySearch (query) {
      var results = query ? loadAll().filter( createFilterFor(query) ) : self.Item,
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
      /*      $log.info('Text changed to ' + text);*/
    }

    function selectedItemChange(item) {
      $scope.allObjects.forEach(function (argument) {
        if(argument.name===item.display){
          $scope.pushToArray(argument);
        }
      })
    }


    $scope.pushToArray = function (item){  
     var marker; 
     $scope.itemToDB.actionObjects.forEach( function(entry) {
      if (entry.name===item.name) {
        marker = 1;
      }})
     if (marker===1) {
      return
    }
    $scope.itemToDB.actionObjects.push(item);
  };

  $scope.delFromArray = function (item){  
   $scope.itemToDB.actionObjects.forEach( function(entry) {
     if (entry===item) {
       $scope.itemToDB.actionObjects.splice( $scope.itemToDB.actionObjects.indexOf(item), 1);
     }})
 };


 $scope.writeDB = function (){
    Search.action.save($scope.itemToDB);
}

function loadAllItems (){
  var def = $q.defer();

  Search.allactions.query(function (argument) {
   argument.forEach(function (item) {
    $scope.allObjects.push(item)
    actionString = actionString +", "+ item.name;
  })
   def.resolve(actionString);
 })
  Search.allcategories.query(function (argument) {
   argument.forEach(function (item) {
    $scope.allCategories.push(item)
  })
 })
  return def.promise;
}

$scope.getSelectedText = function() {
  if ($scope.selectedItem !== undefined) {
    $scope.itemToDB.disaster=$scope.selectedItem;
    console.log($scope.itemToDB)
    return ($scope.selectedItem.disasterType.name+" |  "+$scope.selectedItem.title+"  |  "+$scope.selectedItem.area);
  } else {
    return "Wählen sie eine gemeldete Katastrophe:";
  }
};

function loadAll() {
 return actionString.split(/, +/g).map( function (item) {
  return {
    value: item.toLowerCase(),
    display: item
  };
});
}

/*---------------------------------------------------Filter items after categories----------------------------------------------------*/

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

        /*--------------------------------------------------MAP-------------------------------------------------------------*/

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

        


           //create the heatmap
           

//mouselistener for click event
map.addListener('click', function(event) {  
  addMarker(event.latLng); 
});       



//sets the point of the user

};


function addMarker(location) {  
  var marker = new google.maps.Marker({  
    position: location,  
    map: map  
  });  
} 


}
})();
