(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('OffersDetailController', OffersDetailController);

    OffersDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Offers'];

    function OffersDetailController($scope, $rootScope, $stateParams, entity, Offers) {
        var vm = this;

        vm.offers = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:offersUpdate', function(event, result) {
            vm.offers = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
