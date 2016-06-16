(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('Give', Give);

    Give.$inject = ['$resource'];

    function Give ($resource) {
        var resourceUrl =  'api/disasters/:id';

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
