(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('Category', Category);

    Category.$inject = ['$resource'];

    function Category ($resource) {
        var resourceUrl =  'disasterservice/' + 'api/categories/:id';

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
            'save': { method:'POST' },
            'update': { method:'PUT' },
            'delete':{ method:'DELETE'}
        });
    }
})();
