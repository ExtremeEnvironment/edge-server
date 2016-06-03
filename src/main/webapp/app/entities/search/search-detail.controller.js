(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('SearchDetailController', SearchDetailController);

    SearchDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Search'];

    function SearchDetailController($scope, $rootScope, $stateParams, entity, Search) {
        var vm = this;

        vm.search = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:searchUpdate', function(event, result) {
            vm.search = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
