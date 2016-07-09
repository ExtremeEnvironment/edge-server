(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('WantedDetailController', WantedDetailController);

    WantedDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Wanted'];

    function WantedDetailController($scope, $rootScope, $stateParams, entity, Wanted) {
        var vm = this;

        vm.wanted = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:wantedUpdate', function(event, result) {
            vm.wanted = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
