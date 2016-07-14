(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('GiveController', GiveController);

  GiveController.$inject = ['$scope', '$state', '$timeout', '$q', '$log' ,'Data',  '$mdDialog', '$mdMedia'];

  function GiveController ( $scope, $state, $timeout, $q, $log, Data,  $mdDialog, $mdMedia) {

    var self = this;
    var actionString = null;

    $scope.filters ={};
    $scope.allObjects=[];
    $scope.allCategories=[];
    $scope.SingleItem=null;

    $scope.itemToDB={
      actionObjects: [],
      actionType : "OFFER",
      isExpired : null,
      lat : latitude ,
      lon : longitude,
    };

    /*------------------------------------Query Search looks for items in itemlist-------------------------------------------*/


    self.simulateQuery = false;
    self.isDisabled    = false;
    self.Items      = loadAllItems();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
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

    function selectedItemChange(item) {
      $scope.allObjects.forEach(function (argument) {
        if(argument.name===item.display){
          $scope.pushToArray(argument);
        }
      })
    }


    /*---------------------------------Methods to manipulate the action and to save and delete them from the system------------------*/

    $scope.pushToArray = function (item){  
      $scope.SingleItem = item;
    };

    $scope.delFromArray = function (item){  
     $scope.SingleItem = null;
   };


   $scope.writeDB = function (){
    $scope.itemToDB.actionObjects.push($scope.SingleItem),
    Data.action.save($scope.itemToDB);
    $state.go("home");
  }

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

        /*--------------------------------------------------------------MAP-------------------------------------------------------------*/

        var map;
        var latitude;
        var longitude;

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
          zoom: 10,
          center: latlng
        };
        map = new google.maps.Map(document.getElementById("map"), myOptions);

        var marker = new google.maps.Marker({
          map: map,
          draggable: true,
          position: {lat: latitude, lng: longitude}
        });

        google.maps.event.addListener(marker, 'dragend', function(evt){
         $scope.itemToDB.lat = marker.position.lat();
         $scope.itemToDB.lon = marker.position.lng();
         
       });

        map.addListener('click', function(evt) {
          marker.setPosition({lat: evt.latLng.lat(), lng: evt.latLng.lng()});
          $scope.itemToDB.lat = evt.latLng.lat();
          $scope.itemToDB.lon = evt.latLng.lng();

        });

        var circle = new google.maps.Circle({
          map: map,
          radius: 5000,  
          fillColor: '#66ff66',
          strokeOpacity: 0
        });
        circle.bindTo('center', marker, 'position');

      };

    }
  })();
