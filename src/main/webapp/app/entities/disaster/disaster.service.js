(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('Disaster', Disaster);

    Disaster.$inject = ['$resource'];

    function Disaster ($resource) {
<<<<<<< HEAD
        var resourceUrl =  'api/disasters/:id';
=======
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
            'update': { method:'PUT' }
        });
    }
})();


