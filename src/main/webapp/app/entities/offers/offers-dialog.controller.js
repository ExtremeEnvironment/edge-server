(function() {
    'use strict';

    angular
    .module('edgeServerApp')
    .controller('OffersDialogController', OffersDialogController);

    OffersDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'Offers'];

    function OffersDialogController ($timeout, $scope, $stateParams, $uibModalInstance, Offers) {
        var vm = this;

        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.offers.id !== null) {
                Offers.update(vm.offers, onSaveSuccess, onSaveError);
            } else {
                Offers.save(vm.offers, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('edgeServerApp:offersUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        $scope.saveToDB = function () {
             $uibModalInstance.close();
        }

        $scope.filters = { };

        var selectedItems=['Holz'];
        $scope.selectedItems= selectedItems;

        var self = this;
        self.simulateQuery = false;
        self.isDisabled    = false;
        // list of `state` value/display objects
        self.Items      = loadAll();

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
  //$log.info(selectedItems);
};

$scope.delFromArray = function (item){  
   var marker; 
   selectedItems.forEach( function(entry) {
     if (entry===item) {
       selectedItems.splice(selectedItems.indexOf(item), 1);
   }})
};


$scope.writeDB = function (){
//WRITE TO DATABASE
}

$scope.selectedItem;
$scope.getSelectedText = function() {
  if ($scope.selectedItem !== undefined) {
    return ($scope.selectedItem.what+" |  "+$scope.selectedItem.where+"  |  "+$scope.selectedItem.notes);
} else {
    return "Wählen sie eine gemeldete Katastrophe:";
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
