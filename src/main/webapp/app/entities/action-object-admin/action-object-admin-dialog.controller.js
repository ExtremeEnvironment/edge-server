(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('ActionObjectAdminDialogController', ActionObjectAdminDialogController);

    ActionObjectAdminDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ActionObjectAdmin', 'Action', 'Category'];

    function ActionObjectAdminDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ActionObjectAdmin, Action, Category) {
        var vm = this;

        vm.actionObjectAdmin = entity;
        vm.clear = clear;
        vm.save = save;
        vm.actions = Action.query();
        vm.categories = Category.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.actionObjectAdmin.id !== null) {
                ActionObjectAdmin.update(vm.actionObjectAdmin, onSaveSuccess, onSaveError);
            } else {
                ActionObjectAdmin.save(vm.actionObjectAdmin, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('edgeServerApp:actionObjectAdminUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
