(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('ActionObjectAdminDeleteController',ActionObjectAdminDeleteController);

    ActionObjectAdminDeleteController.$inject = ['$uibModalInstance', 'entity', 'ActionObjectAdmin'];

    function ActionObjectAdminDeleteController($uibModalInstance, entity, ActionObjectAdmin) {
        var vm = this;

        vm.actionObjectAdmin = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ActionObjectAdmin.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
