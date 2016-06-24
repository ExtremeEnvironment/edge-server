(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('ConversationController', ConversationController);

    ConversationController.$inject = ['$scope', '$state', 'Conversation'];

    function ConversationController ($scope, $state, Conversation) {
        var vm = this;
        
        vm.conversations = [];

        loadAll();

        function loadAll() {
            Conversation.query(function(result) {
                vm.conversations = result;
            });
        }
    }
})();
