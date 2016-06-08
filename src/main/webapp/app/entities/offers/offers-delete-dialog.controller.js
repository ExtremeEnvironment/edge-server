(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('OffersDeleteController',OffersDeleteController);

    OffersDeleteController.$inject = ['$uibModalInstance', 'entity', 'Offers'];

    function OffersDeleteController($uibModalInstance, entity, Offers) {
        var vm = this;

        vm.offers = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Offers.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
