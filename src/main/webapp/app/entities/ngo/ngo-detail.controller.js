(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('NgoDetailController', NgoDetailController);

    NgoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Ngo', 'Area'];

    function NgoDetailController($scope, $rootScope, $stateParams, entity, Ngo, Area) {
        var vm = this;

        vm.ngo = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:ngoUpdate', function(event, result) {
            vm.ngo = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
