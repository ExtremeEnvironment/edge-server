(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', '$state', 'Search'];

    function SearchController ($scope, $state, Search) {
        var vm = this;
        
        vm.searches = [];

        loadAll();

        function loadAll() {
            Search.query(function(result) {
                vm.searches = result;
            });
        }
    }
})();
