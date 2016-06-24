(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('ConversationDetailController', ConversationDetailController);

    ConversationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Conversation', 'User', 'Message'];

    function ConversationDetailController($scope, $rootScope, $stateParams, entity, Conversation, User, Message) {
        var vm = this;

        vm.conversation = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:conversationUpdate', function(event, result) {
            vm.conversation = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
