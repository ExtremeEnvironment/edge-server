(function() {
    'use strict';

    angular
    .module('edgeServerApp')
    .controller('OffersController', OffersController);

    OffersController.$inject = ['$scope', '$state', '$timeout', '$q', '$log'];

    function OffersController ( $scope, $state, $timeout, $q, $log) {

        $scope.filters = { };
        loadAll();

        var selectedItem;
        $scope.selectedItem = selectedItem;

        $scope.pushToArray = function (item){  
        $scope.selectedItem = item;
        $log.info(selectedItem);
    };

    $scope.delFromArray = function (item){  
       listOffers.forEach( function(entry) {
         if (entry.$hashKey===item.$hashKey) {
           listOffers.splice(listOffers.indexOf(item), 1);
       }})
   };


   $scope.writeDB = function (){
//WRITE TO DATABASE
}


var listOffers = [
{location: 'Berlin',   actionObjects:['Supplements','Wasser', 'Standardessen', 'Holz', 'Stein'],  date:'28.02.2018'},
{location: 'Munchen',   actionObjects:['Supplements','Wasser', 'Standardessen', 'Holz', 'Stein'],  date:'20.02.2018'},
{location: 'Koeln',   actionObjects:['Supplements','Wasser', 'Standardessen', 'Holz', 'Stein'],  date:'22.02.2019'},
{location: 'Erfurt',   actionObjects:['Supplements','Wasser', 'Standardessen', 'Holz', 'Stein'],  date:'20.04.2218'},
{location: 'Berlin',   actionObjects:['Supplements','Wasser', 'Standardessen', 'Holz', 'Stein'],  date:'20.02.2918'},
];

$scope.propertyName = 'age';
$scope.reverse = true;
$scope.listOffers = listOffers;

$scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
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
  
}
})();
