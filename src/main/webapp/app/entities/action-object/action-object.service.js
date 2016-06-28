(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('ActionObject', ActionObject);

    ActionObject.$inject = ['$resource'];

    function ActionObject ($resource) {
        var resourceUrl =  'disasterservice/' + 'api/action-objects/:id';

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
