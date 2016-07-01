(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('AreaController', AreaController);

    AreaController.$inject = ['$scope', '$state', 'Area'];

    function AreaController ($scope, $state, Area) {
        var vm = this;
        
        vm.areas = [];

        loadAll();

        function loadAll() {
            Area.query(function(result) {
                vm.areas = result;
            });
        }
    }
})();
