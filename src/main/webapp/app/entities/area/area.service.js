(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('Area', Area);

    Area.$inject = ['$resource'];

    function Area ($resource) {
        var resourceUrl =  'disasterservice/' + 'api/areas/:id';

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
