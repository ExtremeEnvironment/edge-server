(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('MessageDetailController', MessageDetailController);

    MessageDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Message'];

    function MessageDetailController($scope, $rootScope, $stateParams, entity, Message) {
        var vm = this;

        vm.message = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:messageUpdate', function(event, result) {
            vm.message = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
