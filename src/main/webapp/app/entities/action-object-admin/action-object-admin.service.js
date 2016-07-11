(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('ActionObjectAdmin', ActionObjectAdmin);

    ActionObjectAdmin.$inject = ['$resource'];

    function ActionObjectAdmin ($resource) {
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
            'update': { method:'PUT' },
            'save': { method:'POST' },
            'delete':{ method:'DELETE'}
        });
    }
})();
