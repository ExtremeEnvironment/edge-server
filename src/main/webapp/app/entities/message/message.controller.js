(function() {
    'use strict';

    angular
    .module('edgeServerApp')
    .controller('MessageController', MessageController);

    MessageController.$inject = ['$scope', '$state', 'Message'];

    function MessageController ($scope, $state, Message) {
        var vm = this;

//         vm.messages = [
//                 {
//                         other: {
//                                 username: "user",
//                                 avatar: "http://a4.files.biography.com/image/upload/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTIwNjA4NjMzNjg3ODAzNDA0.jpg",
//                         },
//                         messages: [
//                                 {
//                                         id: 1,
//                                         content: "ich bin dumm",
//                                         timestamp: 1,
//                                         recipient_id: "admin",
//                                         sender_id: "user",
//                                 },
//                                 {
//                                         id: 2,
//                                         content: "Kannst Du besorgen, worüber wir gesprochen haben? Es ist mittlerweile sehr dringend!",
//                                         recipient_id: "user",
//                                         sender_id: "admin",
//                                         timestamp: 2,
//                                 },
//                         ],
//                 },
//                 {
//                         other: {
//                                 username: "giraffe",
//                                 avatar: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Giraffe-closeup-head.jpg",
//                         },
//                         messages: [
//                                 {
//                                         id: 3,
//                                         content: "ich bin schlau",
//                                         timestamp: 3,
//                                         recipient_id: "admin",
//                                         sender_id: "giraffe",
//                                 },
//                                 {
//                                         id: 4,
//                                         content: "Vielen Dank für Ihre Hilfe! Leider bin ich physikalisch bedingt nicht in der Lage, eigenhändig an Eukalyptus zu gelangen.",
//                                         recipient_id: "giraffe",
//                                         sender_id: "admin",
//                                         timestamp: 4,
//                                 },
//                         ],
//                 },
//         ];

        vm.lastMessage = function(conversation) {
                if (conversation.messages.length <= 0) return;
                return conversation.messages[conversation.messages.length - 1];
        }

        loadAll();

        function loadAll() {
            Message.query(function(result) {
                vm.conversations = result;
            });
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
