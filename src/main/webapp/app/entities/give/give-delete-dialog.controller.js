(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('GiveDeleteController',GiveDeleteController);

    GiveDeleteController.$inject = ['$uibModalInstance', 'entity', 'Give'];

    function GiveDeleteController($uibModalInstance, entity, Give) {
        var vm = this;

        vm.give = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Give.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
