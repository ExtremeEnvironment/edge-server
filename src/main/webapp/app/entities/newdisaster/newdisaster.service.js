(function() {
    'use strict';
    angular
        .module('edgeServerApp')
<<<<<<< HEAD
        .factory('Newdisaster', Newdisaster);

    Newdisaster.$inject = ['$resource'];

    function Newdisaster ($resource) {
        var resourceUrl =  'api/newdisasters/:id';
=======
        .factory('Disaster', Disaster);

    Disaster.$inject = ['$resource'];

    function Disaster ($resource) {
        var resourceUrl =  'disasterservice/api/disasters/:id';
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
            'save': { method:'POST' },
            'update': { method:'PUT' },
            'delete':{ method:'DELETE'}
>>>>>>> origin/Linus-Edge
        });
    }
})();
