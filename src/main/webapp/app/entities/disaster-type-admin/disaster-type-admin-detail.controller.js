(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('DisasterTypeAdminDetailController', DisasterTypeAdminDetailController);

    DisasterTypeAdminDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'DisasterTypeAdmin', 'Disaster'];

    function DisasterTypeAdminDetailController($scope, $rootScope, $stateParams, entity, DisasterTypeAdmin, Disaster) {
        var vm = this;

        vm.disasterTypeAdmin = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:disasterTypeAdminUpdate', function(event, result) {
            vm.disasterTypeAdmin = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
