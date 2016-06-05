(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('DisasterDetailController', DisasterDetailController);

    DisasterDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Disaster'];

    function DisasterDetailController($scope, $rootScope, $stateParams, entity, Disaster) {
        var vm = this;

        vm.disaster = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:disasterUpdate', function(event, result) {
            vm.disaster = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
