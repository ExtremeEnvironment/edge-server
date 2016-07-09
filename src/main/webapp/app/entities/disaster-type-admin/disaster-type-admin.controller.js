(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('DisasterTypeAdminController', DisasterTypeAdminController);

    DisasterTypeAdminController.$inject = ['$scope', '$state', 'DisasterTypeAdmin'];

    function DisasterTypeAdminController ($scope, $state, DisasterTypeAdmin) {
        var vm = this;
        
        vm.disasterTypeAdmins = [];

        loadAll();

        function loadAll() {
            DisasterTypeAdmin.query(function(result) {
                vm.disasterTypeAdmins = result;
            });
        }
    }
})();
