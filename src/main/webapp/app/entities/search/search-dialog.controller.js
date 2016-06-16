(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('SearchDialogController', SearchDialogController);

    SearchDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Search'];

    function SearchDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Search) {
        var vm = this;

        vm.search = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.search.id !== null) {
                Search.update(vm.search, onSaveSuccess, onSaveError);
            } else {
                Search.save(vm.search, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('edgeServerApp:searchUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
