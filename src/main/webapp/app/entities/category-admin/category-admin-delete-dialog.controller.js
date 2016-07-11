(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('CategoryAdminDeleteController',CategoryAdminDeleteController);

    CategoryAdminDeleteController.$inject = ['$uibModalInstance', 'entity', 'CategoryAdmin'];

    function CategoryAdminDeleteController($uibModalInstance, entity, CategoryAdmin) {
        var vm = this;

        vm.categoryAdmin = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            CategoryAdmin.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
