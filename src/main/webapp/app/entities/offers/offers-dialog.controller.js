(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('OffersDialogController', OffersDialogController);

    OffersDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Offers'];

    function OffersDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Offers) {
        var vm = this;

        vm.offers = entity;
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
            if (vm.offers.id !== null) {
                Offers.update(vm.offers, onSaveSuccess, onSaveError);
            } else {
                Offers.save(vm.offers, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('edgeServerApp:offersUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
