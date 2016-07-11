(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('NgoAdminDialogController', NgoAdminDialogController);

    NgoAdminDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'NgoAdmin', 'User'];

    function NgoAdminDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, NgoAdmin, User) {
        var vm = this;

        vm.ngoAdmin = entity;
        vm.clear = clear;
        vm.save = save;
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.ngoAdmin.id !== null) {
                NgoAdmin.update(vm.ngoAdmin, onSaveSuccess, onSaveError);
            } else {
                NgoAdmin.save(vm.ngoAdmin, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('edgeServerApp:ngoAdminUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
