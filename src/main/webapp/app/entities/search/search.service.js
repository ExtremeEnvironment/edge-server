(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('Search', Search);

    Search.$inject = ['$resource'];

    function Search ($resource) {
        var resourceUrl =  'api/searches/:id';

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
