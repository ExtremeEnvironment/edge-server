(function() {
    'use strict';

    angular
    .module('edgeServerApp')
    .controller('MessageController', MessageController);

    MessageController.$inject = ['$scope', '$state', 'Message'];

    function MessageController ($scope, $state, Message) {
        var vm = this;



        loadAll();

        function loadAll() {
           /* Message.query(function(result) {
           });*/
       }

       $scope.showCon = function (index) {
        $scope['selectedItem_'+ index];
        if($scope['selectedItem_'+ index] == true)
        {
         $scope['selectedItem_'+ index] = false;
     }else {
      $scope['selectedItem_'+ index] = true;
  }
}


/*--------------------------------------------------------------STUFF---------------------------------------------------*/

$scope.conversation =  [
{
    id: 1,
    active: true,
    title : "",
    createdAt : "20-03-2016",
    members : [
    {
     id : 1,
         userName : "admin", //der admin use
         resource : "http://user-service/api/users/1"
     },
     {
       id : 2,
         userName : "user", //der admin use
         resource : "http://user-service/api/users/2"
     }
     ],
     messages : [
     {
       messageText: "moin moin",
       user: 1,
   },
   {
    messageText: "ich admin, du nix was los? nix und bei dir? was los? nix und halloa",
    user: 1,
},
{
    messageText: "was los? nix und bei dir?",
    user: 2,
},
{
   messageText: "ich admin, du nix",
   user: 1,
}
]
},
{
    id: 2,
    active: true,
    title : "",
    createdAt : "20-03-2016",
    members : [
    {
       id : 1,
         userName : "admin", //der admin use
         resource : "http://user-service/api/users/1"
     },
     {
       id : 2,
         userName : "user", //der admin use
         resource : "http://user-service/api/users/2"
     }
     ],
     messages : [
     {
       messageText: "moin moin",
       user: 1,
   },
   {
       messageText: "was los?",
       user: 2,
   },
   {
       messageText: "ich admin, du nix",
       user: 1,
   },
   {
       messageText: "moin moin",
       user: 1,
   },
   {
       messageText: "was los?",
       user: 2,
   },
   {
       messageText: "ich admin, du nix",
       user: 1,
   },
   {
       messageText: "moin moin",
       user: 1,
   },
   {
       messageText: "was los?",
       user: 2,
   },
   {
       messageText: "ich admin, du nix",
       user: 1,
   }    
   ]
},
{
    id: 3,
    active: true,
    title : "",
    createdAt : "20-03-2016",
    members : [
    {
       id : 1,
         userName : "admin", //der admin use
         resource : "http://user-service/api/users/1"
     },
     {
       id : 2,
         userName : "user", //der admin use
         resource : "http://user-service/api/users/2"
     }
     ],
     messages : [
     {
       messageText: "moin moin",
       user: 1,
   },
   {
       messageText: "was los?",
       user: 2,
   },
   {
       messageText: "ich admin, du nix",
       user: 1,
   }
   ]
}
]

}
})();
