(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('Offers', Offers);

    Offers.$inject = ['$resource'];

    function Offers ($resource) {
        var resourceUrl =  'api/offers/:id';

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
