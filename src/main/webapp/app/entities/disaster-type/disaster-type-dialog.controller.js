(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('DisasterTypeDialogController', DisasterTypeDialogController);

    DisasterTypeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'DisasterType', 'Disaster'];

    function DisasterTypeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, DisasterType, Disaster) {
        var vm = this;

        vm.disasterType = entity;
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
            if (vm.disasterType.id !== null) {
                DisasterType.update(vm.disasterType, onSaveSuccess, onSaveError);
            } else {
                DisasterType.save(vm.disasterType, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('edgeServerApp:disasterTypeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
