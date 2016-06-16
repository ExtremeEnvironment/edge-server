(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('GiveDetailController', GiveDetailController);

    GiveDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Give'];

    function GiveDetailController($scope, $rootScope, $stateParams, entity, Give) {
        var vm = this;

        vm.give = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:giveUpdate', function(event, result) {
            vm.give = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
