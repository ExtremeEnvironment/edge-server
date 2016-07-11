(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('NgoAdmin', NgoAdmin);

    NgoAdmin.$inject = ['$resource'];

    function NgoAdmin ($resource) {
        var resourceUrl =  'userservice/' + 'api/ngos/:id';

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
