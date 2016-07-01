(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('NgoController', NgoController);

    NgoController.$inject = ['$scope', '$state', 'Ngo'];

    function NgoController ($scope, $state, Ngo) {
        var vm = this;
        
        vm.ngos = [];

        loadAll();

        function loadAll() {
            Ngo.query(function(result) {
                vm.ngos = result;
            });
        }
    }
})();
