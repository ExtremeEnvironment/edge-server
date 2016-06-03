(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('SearchDeleteController',SearchDeleteController);

    SearchDeleteController.$inject = ['$uibModalInstance', 'entity', 'Search'];

    function SearchDeleteController($uibModalInstance, entity, Search) {
        var vm = this;

        vm.search = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Search.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
