(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('CategoryAdmin', CategoryAdmin);

    CategoryAdmin.$inject = ['$resource'];

    function CategoryAdmin ($resource) {
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
            'update': { method:'PUT' },
            'save': { method:'POST' },
            'delete':{ method:'DELETE'}
        });
    }
})();
