(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('DisasterTypeAdminDeleteController',DisasterTypeAdminDeleteController);

    DisasterTypeAdminDeleteController.$inject = ['$uibModalInstance', 'entity', 'DisasterTypeAdmin'];

    function DisasterTypeAdminDeleteController($uibModalInstance, entity, DisasterTypeAdmin) {
        var vm = this;

        vm.disasterTypeAdmin = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            DisasterTypeAdmin.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
