(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('ActionDialogController', ActionDialogController);

    ActionDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Action', 'Disaster', 'User', 'ActionObject'];

    function ActionDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Action, Disaster, User, ActionObject) {
        var vm = this;

        vm.action = entity;
        vm.clear = clear;
        vm.save = save;
        vm.disasters = Disaster.query();
        vm.users = User.query();
        vm.actionobjects = ActionObject.query();
        vm.matchs = Action.query({filter: 'action-is-null'});
        $q.all([vm.action.$promise, vm.matchs.$promise]).then(function() {
            if (!vm.action.match || !vm.action.match.id) {
                return $q.reject();
            }
            return Action.get({id : vm.action.match.id}).$promise;
        }).then(function(match) {
            vm.matches.push(match);
        });
        vm.actions = Action.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.action.id !== null) {
                Action.update(vm.action, onSaveSuccess, onSaveError);
            } else {
                Action.save(vm.action, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('edgeServerApp:actionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
