(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('GiveDialogController', GiveDialogController);

    GiveDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Give'];

    function GiveDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Give) {
        var vm = this;

        vm.give = entity;
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
            if (vm.give.id !== null) {
                Give.update(vm.give, onSaveSuccess, onSaveError);
            } else {
                Give.save(vm.give, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('edgeServerApp:giveUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
