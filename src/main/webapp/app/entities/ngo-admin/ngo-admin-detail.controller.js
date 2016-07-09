(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('NgoAdminDetailController', NgoAdminDetailController);

    NgoAdminDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'NgoAdmin', 'User'];

    function NgoAdminDetailController($scope, $rootScope, $stateParams, entity, NgoAdmin, User) {
        var vm = this;

        vm.ngoAdmin = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:ngoAdminUpdate', function(event, result) {
            vm.ngoAdmin = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
