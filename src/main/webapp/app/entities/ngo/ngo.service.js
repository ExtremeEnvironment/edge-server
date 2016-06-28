(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('Ngo', Ngo);

    Ngo.$inject = ['$resource'];

    function Ngo ($resource) {
        var resourceUrl =  'disasterservice/' + 'api/ngos/:id';

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
