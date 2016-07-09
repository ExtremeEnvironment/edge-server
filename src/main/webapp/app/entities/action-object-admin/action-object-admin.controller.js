(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('ActionObjectAdminController', ActionObjectAdminController);

    ActionObjectAdminController.$inject = ['$scope', '$state', 'ActionObjectAdmin'];

    function ActionObjectAdminController ($scope, $state, ActionObjectAdmin) {
        var vm = this;
        
        vm.actionObjectAdmins = [];

        loadAll();

        function loadAll() {
            ActionObjectAdmin.query(function(result) {
                vm.actionObjectAdmins = result;
            });
        }
    }
})();
