(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('WantedDeleteController',WantedDeleteController);

    WantedDeleteController.$inject = ['$uibModalInstance', 'entity', 'Wanted'];

    function WantedDeleteController($uibModalInstance, entity, Wanted) {
        var vm = this;

        vm.wanted = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Wanted.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
