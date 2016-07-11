(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('NgoAdminController', NgoAdminController);

    NgoAdminController.$inject = ['$scope', '$state', 'NgoAdmin'];

    function NgoAdminController ($scope, $state, NgoAdmin) {
        var vm = this;
        
        vm.ngoAdmins = [];

        loadAll();

        function loadAll() {
            NgoAdmin.query(function(result) {
                vm.ngoAdmins = result;
            });
        }
    }
})();
