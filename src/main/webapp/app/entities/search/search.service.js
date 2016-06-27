(function() {
    'use strict';
    angular
    .module('edgeServerApp')
    .factory('Search', Search);

    Search.$inject = ['$resource'];

    function Search ($resource) {

        var resourceUrl =  'disasterservice/api/actions/:id';
        var resourceUrl2 =  'disasterservice/api/disasters/:id';

        return {
            action: $resource(resourceUrl, {}, {
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
            })
            ,
            disaster: $resource(resourceUrl2, {}, {
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
            })
        };
    }
})();
