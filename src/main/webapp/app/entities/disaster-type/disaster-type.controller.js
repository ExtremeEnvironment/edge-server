(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('DisasterTypeController', DisasterTypeController);

    DisasterTypeController.$inject = ['$scope', '$state', 'DisasterType'];

    function DisasterTypeController ($scope, $state, DisasterType) {
        var vm = this;
        
        vm.disasterTypes = [];

        loadAll();

        function loadAll() {
            DisasterType.query(function(result) {
                vm.disasterTypes = result;
            });
        }
    }
})();
