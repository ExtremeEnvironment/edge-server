(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('WantedDialogController', WantedDialogController);

  WantedDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance' ,'Data', 'Offers','$state'];

  function WantedDialogController ($timeout, $scope, $stateParams, $uibModalInstance, Data, Offers, $state) {
    var vm = this;
    
    vm.clear = clear;
    vm.save = save;

    $scope.allObjects = [];
    $scope.allCategories =[];

    loadAllItems();

    $scope.ItemObject = Offers.getAction();

    console.log($scope.ItemObject)

    /*-------------------------------------load all items----------------------------*/

    function loadAllItems (){

      Data.allactions.query(function (argument) {
       argument.forEach(function (item) {
        $scope.allObjects.push(item)
      })
     })
      Data.allcategories.query(function (argument) {
       argument.forEach(function (item) {
        $scope.allCategories.push(item)
      })
     })
    }


    /*------------------------------------------ModalInstance----------------------------------------------------*/



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
      $scope.$emit('edgeServerApp:wantedUpdate', result);
      $uibModalInstance.close(result);
      vm.isSaving = false;
    }

    function onSaveError () {
      vm.isSaving = false;
    }

    $scope.close = function () {
     $uibModalInstance.close();
   }


   /*---------------------------------------------------PushToArray------------------------------------------------*/




   $scope.pushToArray = function (item){  
     var marker; 
     $scope.ItemObject.actionObjects.forEach( function(entry) {
      if (entry.name===item.name) {
        marker = 1;
      }})
     if (marker===1) {
      return
    }
    $scope.ItemObject.actionObjects.push(item);
  };


  $scope.delFromArray = function (item){  
   $scope.ItemObject.actionObjects.forEach( function(entry) {
     if (entry===item) {
       $scope.ItemObject.actionObjects.splice(     $scope.ItemObject.actionObjects.indexOf(item), 1);
     }})
 };


 $scope.writeDB = function (){
  Data.action.update($scope.ItemObject);
  $uibModalInstance.close();
}




/*--------------------------------------------Scrollbar-Implementation----------------------------------------*/



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
