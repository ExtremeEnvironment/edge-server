(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('ActionDetailController', ActionDetailController);

    ActionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Action', 'Disaster', 'User', 'ActionObject'];

    function ActionDetailController($scope, $rootScope, $stateParams, entity, Action, Disaster, User, ActionObject) {
        var vm = this;

        vm.action = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:actionUpdate', function(event, result) {
            vm.action = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
