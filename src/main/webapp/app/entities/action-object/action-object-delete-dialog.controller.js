(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('ActionObjectDeleteController',ActionObjectDeleteController);

    ActionObjectDeleteController.$inject = ['$uibModalInstance', 'entity', 'ActionObject'];

    function ActionObjectDeleteController($uibModalInstance, entity, ActionObject) {
        var vm = this;

        vm.actionObject = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ActionObject.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
