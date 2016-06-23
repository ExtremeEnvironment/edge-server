(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('Search', Search);

    Search.$inject = ['$resource'];

    function Search ($resource) {
<<<<<<< HEAD
        var resourceUrl =  'api/searches/:id';
=======
        var resourceUrl =  'disasterservice/api/action/:id';
>>>>>>> origin/Linus-Edge

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
<<<<<<< HEAD
            'update': { method:'PUT' }
=======
            'update': { method:'PUT' },
            'save': { method:'POST' },
            'delete':{ method:'DELETE'}
>>>>>>> origin/Linus-Edge
        });
    }
})();
