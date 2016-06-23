(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('Offers', Offers);
<<<<<<< HEAD
    
    Offers.$inject = ['$resource'];

    function Offers ($resource) {
        var resourceUrl =  'api/disasters/:id';
=======

    Offers.$inject = ['$resource'];

    function Offers ($resource) {
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
