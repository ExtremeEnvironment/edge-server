(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('NewdisasterDeleteController',NewdisasterDeleteController);

    NewdisasterDeleteController.$inject = ['$uibModalInstance', 'entity', 'Newdisaster'];

    function NewdisasterDeleteController($uibModalInstance, entity, Newdisaster) {
        var vm = this;

        vm.newdisaster = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Newdisaster.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
