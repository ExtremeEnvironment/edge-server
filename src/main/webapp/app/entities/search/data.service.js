(function() {
    'use strict';
    angular
    .module('edgeServerApp')
    .factory('Data', Data);

    Data.$inject = ['$resource'];

    function Data ($resource) {

        var resourceUrl =  'disasterservice/api/actions/:id';
        var resourceUrl2 =  'disasterservice/api/disasters/:id';
        var resourceUrl3 =  'disasterservice/api/action-objects/:id';
        var resourceUrl4 =  'disasterservice/api/categories/:id';
        var resourceUrl5 =  'disasterservice/api/action-objects/topten/:id';
        var resourceUrl6 = 'disasterservice/api/disaster-types/';
        var resourceUr2 = 'userservice/api/ngos/:ngoId/:userId';

        return {
            disastertype: $resource(resourceUrl6, {}, {
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
            ngouser: $resource(resourceUr2, {}, {
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
            }),
            topten: $resource(resourceUrl5, {}, {
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
            allcategories: $resource(resourceUrl4, {}, {
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
