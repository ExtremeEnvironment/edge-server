(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('DisasterType', DisasterType);

    DisasterType.$inject = ['$resource'];

    function DisasterType ($resource) {
        var resourceUrl =  'disasterservice/' + 'api/disaster-types/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
