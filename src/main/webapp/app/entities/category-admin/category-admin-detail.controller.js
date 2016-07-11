(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('CategoryAdminDetailController', CategoryAdminDetailController);

    CategoryAdminDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'CategoryAdmin', 'ActionObject'];

    function CategoryAdminDetailController($scope, $rootScope, $stateParams, entity, CategoryAdmin, ActionObject) {
        var vm = this;

        vm.categoryAdmin = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:categoryAdminUpdate', function(event, result) {
            vm.categoryAdmin = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
