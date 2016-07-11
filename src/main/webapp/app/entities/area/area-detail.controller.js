(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('AreaDetailController', AreaDetailController);

    AreaDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Area', 'Corner', 'Ngo', 'Disaster'];

    function AreaDetailController($scope, $rootScope, $stateParams, entity, Area, Corner, Ngo, Disaster) {
        var vm = this;

        vm.area = entity;

        var unsubscribe = $rootScope.$on('edgeServerApp:areaUpdate', function(event, result) {
            vm.area = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
