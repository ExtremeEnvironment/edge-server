(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('Wanted', Wanted);

    Wanted.$inject = ['$resource'];

    function Wanted ($resource) {
        var resourceUrl =  'api/wanteds/:id';

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
