(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('NgoDialogController', NgoDialogController);

  NgoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'USer', 'Data'];

  function NgoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, USer, Data) {
    var vm = this;

    vm.ngo = entity;
    vm.clear = clear;
    vm.save = save;

    /*------------------------------------------ModalInstance----------------------------------------------------*/




    $timeout(function (){
      angular.element('.form-group:eq(1)>input').focus();
    });

    function clear () {
      $uibModalInstance.dismiss('cancel');
    }

    function save () {
      vm.isSaving = true;
      if (vm.ngo.id !== null) {
        Ngo.update(vm.ngo, onSaveSuccess, onSaveError);
      } else {
        Ngo.save(vm.ngo, onSaveSuccess, onSaveError);
      }
    }

    function onSaveSuccess (result) {
      $scope.$emit('edgeServerApp:ngoUpdate', result);
      $uibModalInstance.close(result);
      vm.isSaving = false;
    }

    function onSaveError () {
      vm.isSaving = false;
    }

    $scope.close = function () {
     $uibModalInstance.close();
   }


   $scope.allUsers = [];
   $scope.ItemObject;

   loadAllItems();

   /*-------------------------------------load all items----------------------------*/

   function loadAllItems (){

    USer.user.query(function (argument) {
     argument.forEach(function (item) {
      $scope.allUsers.push(item)
      console.log(item)
    })
   })
  }


  /*---------------------------------------------------PushToArray------------------------------------------------*/




  $scope.pushToArray = function (item){ 
    $scope.ItemObject=item;

    console.log(  $scope.ItemObject)
    $scope.allUsers.forEach(function (argument) {
      if(argument.id==item){
        $scope.ItemObject=argument;
      }
    }) 

  };


  $scope.delFromArray = function (item){  
   $scope.ItemObject=null;
 };


 $scope.writeDB = function (){
  //console.log($scope.ItemObject.id)
  var stag ={
    ngoId:1,
    userId:3};

    USer.ngouser.save(stag);
      //$uibModalInstance.close();
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
