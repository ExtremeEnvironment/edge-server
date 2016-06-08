(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('OffersController', OffersController);

    OffersController.$inject = ['$scope', '$state', 'Offers'];

    function OffersController ($scope, $state, Offers) {
        var vm = this;
        
        vm.offers = [];

        loadAll();

        function loadAll() {
            Offers.query(function(result) {
                vm.offers = result;
            });
        }
    }
})();
