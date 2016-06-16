(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('MessageController', MessageController);

    MessageController.$inject = ['$scope', '$state', 'Message'];

    function MessageController ($scope, $state, Message) {
        var vm = this;

        vm.messages = [
                {
                        other: {
                                username: "user",
                                avatar: "http://a4.files.biography.com/image/upload/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTIwNjA4NjMzNjg3ODAzNDA0.jpg",
                        },
                        messages: [
                                {
                                        id: 1,
                                        content: "ich bin dumm",
                                        timestamp: 1,
                                        recipient_id: "admin",
                                        sender_id: "user",
                                },
                                {
                                        id: 2,
                                        content: "Kannst Du besorgen, worüber wir gesprochen haben? Es ist mittlerweile sehr dringend!",
                                        recipient_id: "user",
                                        sender_id: "admin",
                                        timestamp: 2,
                                },
                        ],
                },
                {
                        other: {
                                username: "giraffe",
                                avatar: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Giraffe-closeup-head.jpg",
                        },
                        messages: [
                                {
                                        id: 3,
                                        content: "ich bin schlau",
                                        timestamp: 3,
                                        recipient_id: "admin",
                                        sender_id: "giraffe",
                                },
                                {
                                        id: 4,
                                        content: "Vielen Dank für Ihre Hilfe! Leider bin ich physikalisch bedingt nicht in der Lage, eigenhändig an Eukalyptus zu gelangen.",
                                        recipient_id: "giraffe",
                                        sender_id: "admin",
                                        timestamp: 4,
                                },
                        ],
                },
        ];

        loadAll();

        function loadAll() {
            Message.query(function(result) {
//                 vm.messages = result;
            });
        }
    }
})();
