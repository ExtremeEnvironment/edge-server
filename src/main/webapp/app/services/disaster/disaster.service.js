(function () {
    'use strict';

    angular
        .module('edgeServerApp')
        .factory('Disaster', Disaster);

    Disaster.$inject = ['$resource'];

    function Disaster ($resource) {
        $scope.console.log('service');
        var service = $resource('disasterservice/api/actions/:getAllActions', {}, {});

        return service;
    }
})();
