(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('GiveController', GiveController);

  GiveController.$inject = ['$scope', '$state', '$timeout', '$q', '$log' ,'Data',  '$mdDialog', '$mdMedia'];

  function GiveController ( $scope, $state, $timeout, $q, $log, Data,  $mdDialog, $mdMedia) {

    var self = this;
    var actionString = null;

    $scope.filters = { };
    $scope.allObjects=[];
    $scope.allCategories=[];


    $scope.itemToDB={
      actionObjects: [],
      actionType : "OFFER",
      isExpired : null,
      lat :34.03,
      lon : 34.05,
      user: null
    };

    /*------------------------------------Query Search looks for items in itemlist-------------------------------------------*/


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


    /*---------------------------------Methods to manipulate the action and to save and delete them from the system------------------*/

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
  Data.action.save($scope.itemToDB);
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

/*-------------------------------------load all items asynchronously----------------------------*/

function loadAllItems (){
  var def = $q.defer();

  Data.allactions.query(function (argument) {
   argument.forEach(function (item) {
    $scope.allObjects.push(item)
    actionString = actionString +", "+ item.name;
  })
   def.resolve(actionString);
 })
  Data.allcategories.query(function (argument) {
   argument.forEach(function (item) {
    $scope.allCategories.push(item)
  })
 })
  return def.promise;
}

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

<<<<<<< HEAD

//init map
        var map, marker, circle;
=======
        /*--------------------------------------------------------------MAP-------------------------------------------------------------*/

        var map;  

>>>>>>> 6dd99226cf0027e48375af11e808f0a88f3fb652

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

        

  

<<<<<<< HEAD
      //mouselistener for click event
      google.maps.event.addListener(map, 'click', function(event) {
           placeMarker(event.latLng);
        }); 
      
=======
           //create the heatmap
           

//mouselistener for click event
map.addListener('click', function(event) {  
  addMarker(event.latLng); 
});       
>>>>>>> 6dd99226cf0027e48375af11e808f0a88f3fb652



//sets the point of the user

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

<<<<<<< HEAD

//remove marker
$scope.removeMarker = function(){
 marker.setMap(null);
 circle.setMap(null);
}
=======
function addMarker(location) {  
  var marker = new google.maps.Marker({  
    position: location,  
    map: map  
  });  
} 

>>>>>>> 6dd99226cf0027e48375af11e808f0a88f3fb652


}
})();
