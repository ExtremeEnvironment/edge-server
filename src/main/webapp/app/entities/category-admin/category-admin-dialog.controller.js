(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('CategoryAdminDialogController', CategoryAdminDialogController);

    CategoryAdminDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'CategoryAdmin', 'ActionObject'];

    function CategoryAdminDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, CategoryAdmin, ActionObject) {
        var vm = this;

        vm.categoryAdmin = entity;
        vm.clear = clear;
        vm.save = save;
        vm.actionobjects = ActionObject.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.categoryAdmin.id !== null) {
                CategoryAdmin.update(vm.categoryAdmin, onSaveSuccess, onSaveError);
            } else {
                CategoryAdmin.save(vm.categoryAdmin, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('edgeServerApp:categoryAdminUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
