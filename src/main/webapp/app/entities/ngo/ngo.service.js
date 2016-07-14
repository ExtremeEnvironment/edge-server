(function() {
    'use strict';
    angular
    .module('edgeServerApp')
    .factory('USer', USer);

    USer.$inject = ['$resource'];

    function USer ($resource) {
        var resourceUrl =  'userservice/api/users';
        var resourceUr2 = 'userservice/api/ngos/:ngoId/:userId';
        var resourceUr3 = 'userservice/api/ngos';
        return {

            user: $resource(resourceUrl, {}, {
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
            }),
            ngouser: $resource(resourceUr2, {ngoId:'@ngoId',userId:'@userId'}, {
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
            ngo: $resource(resourceUr3, {}, {
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


        }
    }

})();
