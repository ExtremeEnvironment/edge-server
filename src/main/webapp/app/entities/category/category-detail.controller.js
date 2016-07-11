(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('CategoryDetailController', CategoryDetailController);

    CategoryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Category', 'ActionObject'];

    function CategoryDetailController($scope, $rootScope, $stateParams, entity, Category, ActionObject) {
        var vm = this;

        vm.category = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:categoryUpdate', function(event, result) {
            vm.category = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
