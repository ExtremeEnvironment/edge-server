(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('NgoDeleteController',NgoDeleteController);

    NgoDeleteController.$inject = ['$uibModalInstance', 'entity', 'Ngo'];

    function NgoDeleteController($uibModalInstance, entity, Ngo) {
        var vm = this;

        vm.ngo = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Ngo.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
