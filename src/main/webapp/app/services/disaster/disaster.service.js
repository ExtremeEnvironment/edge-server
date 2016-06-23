<<<<<<< HEAD
<<<<<<< 0ee9572ec28bf15b0d245ddf3d6149a7ee27f018
(function () {
    'use strict';

=======
(function() {
    'use strict';
>>>>>>> added message view
=======
(function() {
    'use strict';
>>>>>>> origin/Linus-Edge
    angular
        .module('edgeServerApp')
        .factory('Disaster', Disaster);

    Disaster.$inject = ['$resource'];

    function Disaster ($resource) {
<<<<<<< HEAD
<<<<<<< 0ee9572ec28bf15b0d245ddf3d6149a7ee27f018
        $scope.console.log('service');
        var service = $resource('disasterservice/api/actions/:getAllActions', {}, {});

        return service;
    }
})();
=======
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


<<<<<<< HEAD
>>>>>>> added message view
=======
>>>>>>> origin/Linus-Edge
