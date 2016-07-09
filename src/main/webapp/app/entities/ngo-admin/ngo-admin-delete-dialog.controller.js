(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('NgoAdminDeleteController',NgoAdminDeleteController);

    NgoAdminDeleteController.$inject = ['$uibModalInstance', 'entity', 'NgoAdmin'];

    function NgoAdminDeleteController($uibModalInstance, entity, NgoAdmin) {
        var vm = this;

        vm.ngoAdmin = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            NgoAdmin.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
