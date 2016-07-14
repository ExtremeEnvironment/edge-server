  (function() {
    'use strict';

    angular
    .module('edgeServerApp')
    .controller('MessageController', MessageController);

    MessageController.$inject = ['$scope', '$state', 'Message','$mdDialog', '$mdMedia','$q', '$timeout','Data'];

    function MessageController ($scope, $state, Message, $mdDialog, $mdMedia,$q, $timeout,Data) {

      loadAll();

      $scope.conversations=[];
      $scope.data=[];
      $scope.messages=[];
      $scope.User;
      $scope.numLimit = 10;
      $scope.top = 5000;

      $scope.message={messageText : null};

      function loadAll() {
        Message.conversations.query(function(result) {
          result.forEach(function (argument) {
            if(argument.type==="match"){
              $scope.conversations.push(argument);
              $scope.data.push(Data.action.get({id:argument.matchedActionId}))
            }
          })
        });
        Message.user.get(function(result) {
          $scope.User = result;
          console.log(result)
        });
      }

      function loadMessages (argument,index) {
        Message.messages.query({id:argument},function(result) {
          result.forEach(function (argument) {
            $scope['messages'+ index].push(argument);
            $scope.top =  $scope.top -1;
          })
        });
      }

      $scope.showCon = function (index,id) {
        $scope['selectedItem_'+ index];
        $scope['messages'+ index]=[];
        if($scope['selectedItem_'+ index] == true){
         $scope['messages'+ index]=[];
         $scope['selectedItem_'+ index] = false;
       }else {
        loadMessages(id,index);
        $scope['selectedItem_'+ index] = true;
      }
    }
    $scope.delFromArray = function (argument) {
      showAlert("Sicher das sie das Match löschen wollen?","Auch ihr Match wird gelöscht!",argument)
    }

    $scope.send =  function (argument,index) {
      if ($scope.message.messageText==null) {
        showAlert2("Bitte eine Nachricht eingeben")
      } else {
        $scope.top =  $scope.top + 1;
        $scope['messages'+ index].push({messageText: $scope.message.messageText, messageUser:  $scope.User.login , messageDate: "Gerade"});

        var letsgo =function () {
         $timeout(function () {
           $scope.message.messageText=null
         }, 500);
       }

       var thirdFn = function() {
        var deferred = $q.defer();
        if(Message.newmessage.save({conversationId:argument},$scope.message)){
          deferred.resolve;
        }
        return deferred.promise;
      }

      thirdFn().then(letsgo());

    }

  }

  /*--------------------------------------------------------------STUFF---------------------------------------------------*/

  function showAlert(erste,zweite,argument) {

    var confirm = $mdDialog.confirm()
    .title(erste)
    .textContent(zweite)
    .targetEvent()
    .ok('Nein')
    .cancel('Ja');
    $mdDialog.show(confirm).then(function() {
      console.log('NEIN')
    }, function() {
      $scope.conversations.forEach( function(entry) {
        if (argument===entry) {
          $scope.conversations.splice( $scope.conversations.indexOf(argument), 1);
        }})
      Message.delete.delete({id:argument.id});
    });
  };

  function showAlert2(text){
    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title(text)
      .ok('Ok')
      .targetEvent()
      );
  };

}
})();
