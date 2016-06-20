(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('NewdisasterDetailController', NewdisasterDetailController);

    NewdisasterDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Disaster'];

    function NewdisasterDetailController($scope, $rootScope, $stateParams, entity, Disaster) {
        var vm = this;

        vm.newdisaster = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:newdisasterUpdate', function(event, result) {
            vm.newdisaster = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
