(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('Newdisaster', Newdisaster);

    Newdisaster.$inject = ['$resource'];

    function Newdisaster ($resource) {
        var resourceUrl =  'api/newdisasters/:id';

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
