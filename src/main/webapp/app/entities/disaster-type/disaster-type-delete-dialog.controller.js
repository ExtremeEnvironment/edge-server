(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('DisasterTypeDeleteController',DisasterTypeDeleteController);

    DisasterTypeDeleteController.$inject = ['$uibModalInstance', 'entity', 'DisasterType'];

    function DisasterTypeDeleteController($uibModalInstance, entity, DisasterType) {
        var vm = this;

        vm.disasterType = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            DisasterType.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
