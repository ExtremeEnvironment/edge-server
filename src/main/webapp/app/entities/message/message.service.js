(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('Message', Message);

    Message.$inject = ['$resource'];

    function Message ($resource) {
        var resourceUrl =  'messageservice/api/conversations/:id';

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
