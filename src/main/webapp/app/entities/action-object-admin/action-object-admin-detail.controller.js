(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('ActionObjectAdminDetailController', ActionObjectAdminDetailController);

    ActionObjectAdminDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ActionObjectAdmin', 'Action', 'Category'];

    function ActionObjectAdminDetailController($scope, $rootScope, $stateParams, entity, ActionObjectAdmin, Action, Category) {
        var vm = this;

        vm.actionObjectAdmin = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:actionObjectAdminUpdate', function(event, result) {
            vm.actionObjectAdmin = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
