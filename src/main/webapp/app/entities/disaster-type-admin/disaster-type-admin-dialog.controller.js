(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('DisasterTypeAdminDialogController', DisasterTypeAdminDialogController);

    DisasterTypeAdminDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'DisasterTypeAdmin', 'Disaster'];

    function DisasterTypeAdminDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, DisasterTypeAdmin, Disaster) {
        var vm = this;

        vm.disasterTypeAdmin = entity;
        vm.clear = clear;
        vm.save = save;
        vm.disasters = Disaster.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.disasterTypeAdmin.id !== null) {
                DisasterTypeAdmin.update(vm.disasterTypeAdmin, onSaveSuccess, onSaveError);
            } else {
                DisasterTypeAdmin.save(vm.disasterTypeAdmin, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('edgeServerApp:disasterTypeAdminUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
