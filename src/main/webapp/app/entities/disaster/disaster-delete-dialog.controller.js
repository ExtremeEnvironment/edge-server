(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('DisasterDeleteController',DisasterDeleteController);

    DisasterDeleteController.$inject = ['$uibModalInstance', 'entity', 'Disaster'];

    function DisasterDeleteController($uibModalInstance, entity, Disaster) {
        var vm = this;

        vm.disaster = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Disaster.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
