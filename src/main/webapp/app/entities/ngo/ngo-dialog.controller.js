(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('NgoDialogController', NgoDialogController);

    NgoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Ngo'];

    function NgoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Ngo) {
        var vm = this;

        vm.ngo = entity;
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
            if (vm.ngo.id !== null) {
                Ngo.update(vm.ngo, onSaveSuccess, onSaveError);
            } else {
                Ngo.save(vm.ngo, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('edgeServerApp:ngoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
