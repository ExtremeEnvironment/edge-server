(function() {
    'use strict';
    angular
    .module('edgeServerApp')
    .factory('Search', Search);

    Search.$inject = ['$resource'];

    function Search ($resource) {

        var resourceUrl =  'disasterservice/api/actions/:id';
        var resourceUrl2 =  'disasterservice/api/disasters/:id';
        var resourceUrl3 =  'disasterservice/api/action-objects/:id';
        var resourceUrl14 =  'disasterservice/api/categories/:id';

        return {
            allcategories: $resource(resourceUrl14, {}, {
                'query': {cache: true, method: 'GET', isArray: true},
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
            action: $resource(resourceUrl, {}, {
                'query': {cache: true, method: 'GET', isArray: true},
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
            }),
            allactions: $resource(resourceUrl3, {}, {
                'query': { method: 'GET', isArray: true},
                'get': {
                    method: 'GET',
                    transformResponse: function (data) {
                        if (data) {
                            data = angular.fromJson(data);
                        }
                        return data;
                    }
                }
            })
        };
    }
})();
