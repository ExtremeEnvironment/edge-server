(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('SearchController', SearchController);

  SearchController.$inject = ['$scope', '$state', '$timeout', '$q', '$log' ,'Data',  '$mdDialog', '$mdMedia'];

  function SearchController ( $scope, $state, $timeout, $q, $log, Data,  $mdDialog, $mdMedia) {

    $scope.filters = { };
    $scope.itemToDB={
      actionObjects: [],
      actionType : "SEEK",
      disaster : {},
      isExpired : null,
      lat :34.03,
      lon : 34.05,
      user: null
    };

    $scope.allObjects=[];
    $scope.allCategories=[];
    $scope.actions=[];
    $scope.disasters=[];
    var selectedItems=[];
    var actionString;
    var imagePath = 'content/images/logo-jhipster.png';

    $scope.selectedItem;
    $scope.selectedItems= selectedItems;

    loadAllActions();

    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    self.Items      = loadAlls();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.newItem = newItem;

    function loadAlls () {
      Data.disaster.query(function(result) {
       result.forEach(function (item) {
         $scope.disasters.push(item)
         console.log(item)
       })
     })
      Data.action.query(function(result) {
       result.forEach(function (item) {
        $scope.actions.push(item)
        console.log(item)
      })
     })
    }

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
      console.log(item)
      $scope.pushToArray(value);
    }


    $scope.pushToArray = function (item){  
     var marker; 
     $scope.itemToDB.actionObjects.forEach( function(entry) {
      console.log(item.name)
      if (entry.name===item.name) {
        marker = 1;
      }})
     if (marker===1) {
      return
    }
    $scope.itemToDB.actionObjects.push(item);
    console.log( $scope.itemToDB.actionObjects)
  };

  $scope.delFromArray = function (item){  
   $scope.itemToDB.actionObjects.forEach( function(entry) {
     if (entry===item) {
       $scope.itemToDB.actionObjects.splice( $scope.itemToDB.actionObjects.indexOf(item), 1);
     }})
 };


 $scope.writeDB = function (){
  if($scope.selectedItem!=null){ 
    console.log("IS GUT")
        Data.action.save($scope.itemToDB);
  }else {
    showAlert();
  }

}

function loadAllActions  (){
  Data.allactions.query(function (argument) {
   argument.forEach(function (item) {
    $scope.allObjects.push(item)
    actionString = actionString +", "+ item.name;
  })
 })
  Data.allcategories.query(function (argument) {
   argument.forEach(function (item) {
    $scope.allCategories.push(item)
  })
 })
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

function showAlert(){
  $mdDialog.show(
    $mdDialog.alert()
    .parent(angular.element(document.querySelector('#popupContainer')))
    .clickOutsideToClose(true)
    .title('Sie müssen eine Katastrope wählen')
    .ok('Ok')
    .targetEvent()
    );
};


function loadAll() {

  var allItems= 'Schmerzmittel, Antibiotika, Verbände, Baby-Nahrung, Supplements, Wasser, Standardessen, Holz, Stein, Sand, Zelt, Betten, Jacken, Hosen, Schuhe';
  $scope.categories = ["Medizin","Nahrung","Baumaterialien","Unterkunft","Kleidung"];
  return allItems.split(/, +/g).map( function (item) {
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
