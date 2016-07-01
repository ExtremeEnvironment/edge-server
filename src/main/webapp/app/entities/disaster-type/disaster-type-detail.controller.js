(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('DisasterTypeDetailController', DisasterTypeDetailController);

    DisasterTypeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'DisasterType', 'Disaster'];

    function DisasterTypeDetailController($scope, $rootScope, $stateParams, entity, DisasterType, Disaster) {
        var vm = this;

        vm.disasterType = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:disasterTypeUpdate', function(event, result) {
            vm.disasterType = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
