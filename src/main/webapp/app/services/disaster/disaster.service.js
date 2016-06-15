<<<<<<< 0ee9572ec28bf15b0d245ddf3d6149a7ee27f018
(function () {
    'use strict';

=======
(function() {
    'use strict';
>>>>>>> added message view
    angular
        .module('edgeServerApp')
        .factory('Disaster', Disaster);

    Disaster.$inject = ['$resource'];

    function Disaster ($resource) {
<<<<<<< 0ee9572ec28bf15b0d245ddf3d6149a7ee27f018
        $scope.console.log('service');
        var service = $resource('disasterservice/api/actions/:getAllActions', {}, {});

        return service;
    }
})();
=======
        var resourceUrl =  'api/disasters/:id';

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


>>>>>>> added message view
