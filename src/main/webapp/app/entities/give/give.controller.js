(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('GiveController', GiveController);

    GiveController.$inject = ['$scope', '$state', 'Give'];

    function GiveController ($scope, $state, Give) {
        var vm = this;
        
        vm.gives = [];

        loadAll();

        function loadAll() {
            Give.query(function(result) {
                vm.gives = result;
            });
        }
    }
})();
