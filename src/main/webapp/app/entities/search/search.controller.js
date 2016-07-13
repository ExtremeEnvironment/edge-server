(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('SearchController', SearchController);

  SearchController.$inject = ['$scope', '$state', '$timeout', '$q', '$log' ,'Data',  '$mdDialog', '$mdMedia'];

  function SearchController ( $scope, $state, $timeout, $q, $log, Data,  $mdDialog, $mdMedia) {

    var self = this;
    var actionString;
    var imagePath = 'content/images/logo-jhipster.png';

    $scope.selectedItem;
    $scope.SingleItem=null;

    var dates = new Date();


    $scope.allObjects=[];
    $scope.allCategories=[];
    $scope.actions=[];
    $scope.disasters=[];

    $scope.filters = { };

    $scope.itemToDB={
      actionObjects: [],
      actionType : "SEEK",
      disaster : {
      },
      isExpired : null,
      lat : latitude,
      lon : longitude
    };


    self.simulateQuery = false;
    self.isDisabled    = false;
    self.Items      = loadAllItems();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.newItem = newItem;

    loadActionsAndDisaster();

    /*-------------------------------------load all items asynchronously----------------------------*/

    function loadActionsAndDisaster () {
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


   /*------------------------------------Query Search looks for items in itemlist-------------------------------------------*/


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
   /* $log.info('Text changed to ' + text);*/
 }

 function selectedItemChange(item) {
  var value = item.display;
  console.log(item)
  $scope.pushToArray(value);
}

/*---------------------------------Methods to manipulate the action and to save and delete them from the system------------------*/


$scope.pushToArray = function (item){  
  $scope.SingleItem = item;
};

$scope.delFromArray = function (item){  
 $scope.SingleItem = null;
};


$scope.writeDB = function (){
  if($scope.selectedItem==null){ 
    showAlert('Sie müssen eine Katastrope wählen');
  }else if($scope.SingleItem == null) {
    showAlert('Sie müssen ein Item wählen');
  }else{
    $scope.itemToDB.actionObjects.push($scope.SingleItem);
    console.log($scope.itemToDB)
    Data.action.save($scope.itemToDB);
    $state.go("home");
  }

}

$scope.getSelectedText = function() {
  if ($scope.selectedItem != undefined) {
    $scope.itemToDB.disaster=$scope.selectedItem;
    circle2.setOptions({
      center :  {lat:$scope.selectedItem.lat,lng:$scope.selectedItem.lon}
    });
    map.setOptions({
      center : {lat:$scope.selectedItem.lat,lng:$scope.selectedItem.lon},
      zoom : 10
    });
    circle.setOptions({
      center :  {lat:$scope.selectedItem.lat,lng:$scope.selectedItem.lon}
    });
    return ($scope.selectedItem.disasterType.name+" |  "+$scope.selectedItem.title+"  |  "+$scope.selectedItem.date);
  } else {
    return "Wählen sie eine gemeldete Katastrophe:";
  }
};


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

        /*-------------------------------------------Various Helper Functions-------------------------------------------------*/

        function showAlert(text){
          $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title(text)
            .ok('Ok')
            .targetEvent()
            );
        };

        /*-------------------------------------------------------MAP-----------------------------------------------------------*/

        /*--------------------------------------------------------------MAP-------------------------------------------------------------*/

        var map;

        var latitude;
        var longitude;
        var circle;
        var circle2;

        navigator.geolocation.getCurrentPosition(function(position){
          latitude = position.coords.latitude;
          longitude= position.coords.longitude;
          $scope.itemToDB.lat = position.coords.latitude
          $scope.itemToDB.lon = position.coords.longitude;
          initialize(position.coords);

        });

        function initialize(coords) {
         var  latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
         var myOptions = {
          zoom: 8,
          center: latlng,
          layerId: '06673056454046135537-08896501997766553811'
        };
        map = new google.maps.Map(document.getElementById("map"), myOptions);

        var marker = new google.maps.Marker({
          map: map,
          draggable: true,
/*          position: {lat: latitude, lng: longitude}*/
        });



        google.maps.event.addListener(marker, 'dragend', function(evt){
          console.log(  $scope.itemToDB.lat)
          console.log(  $scope.itemToDB.lon)
          $scope.itemToDB.lat = marker.position.lat();
          $scope.itemToDB.lon = marker.position.lng();

        });

        map.addListener('click', function(evt) {
          console.log(  $scope.itemToDB.lat)
          console.log(  $scope.itemToDB.lon)  
          marker.setPosition({lat: evt.latLng.lat(), lng: evt.latLng.lng()});
          $scope.itemToDB.lat = evt.latLng.lat();
          $scope.itemToDB.lon = evt.latLng.lng();

        });

        circle = new google.maps.Circle({
          map: map,
          radius: 5000,  
          fillColor: '#BB0000',
          strokeOpacity: 0
        });

        circle2 = new google.maps.Circle({
          map: map,
          radius: 10000,  
          fillColor: '#AAFFFF',
          strokeOpacity: 0
      //position : {lat:offer.disaster.lat,lng:offer.disaster.lon}
    });
        circle.bindTo('center', marker, 'position');

      };


    }
  })();
