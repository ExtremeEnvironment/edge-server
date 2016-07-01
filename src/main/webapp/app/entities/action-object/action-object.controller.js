(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('ActionObjectController', ActionObjectController);

    ActionObjectController.$inject = ['$scope', '$state', 'ActionObject'];

    function ActionObjectController ($scope, $state, ActionObject) {
        var vm = this;
        
        vm.actionObjects = [];

        loadAll();

        function loadAll() {
            ActionObject.query(function(result) {
                vm.actionObjects = result;
            });
        }
    }
})();
