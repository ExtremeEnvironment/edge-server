(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('NewdisasterDialogController', NewdisasterDialogController);

    NewdisasterDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Newdisaster'];

    function NewdisasterDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Newdisaster) {
        var vm = this;

        vm.newdisaster = entity;
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
            if (vm.newdisaster.id !== null) {
                Newdisaster.update(vm.newdisaster, onSaveSuccess, onSaveError);
            } else {
                Newdisaster.save(vm.newdisaster, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('edgeServerApp:newdisasterUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
