(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('ActionObjectDetailController', ActionObjectDetailController);

    ActionObjectDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ActionObject', 'Action', 'Category'];

    function ActionObjectDetailController($scope, $rootScope, $stateParams, entity, ActionObject, Action, Category) {
        var vm = this;

        vm.actionObject = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:actionObjectUpdate', function(event, result) {
            vm.actionObject = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
