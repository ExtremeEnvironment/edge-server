(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('AreaDialogController', AreaDialogController);

    AreaDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Area', 'Corner', 'Ngo', 'Disaster'];

    function AreaDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Area, Corner, Ngo, Disaster) {
        var vm = this;

        vm.area = entity;
        vm.clear = clear;
        vm.save = save;
        vm.corners = Corner.query();
        vm.ngos = Ngo.query({filter: 'area-is-null'});
        $q.all([vm.area.$promise, vm.ngos.$promise]).then(function() {
            if (!vm.area.ngo || !vm.area.ngo.id) {
                return $q.reject();
            }
            return Ngo.get({id : vm.area.ngo.id}).$promise;
        }).then(function(ngo) {
            vm.ngos.push(ngo);
        });
        vm.disasters = Disaster.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.area.id !== null) {
                Area.update(vm.area, onSaveSuccess, onSaveError);
            } else {
                Area.save(vm.area, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('edgeServerApp:areaUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
