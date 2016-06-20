/**
 * Created by linus on 20.06.16.
 */
(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('Conversation', Conversation);

    Conversation.$inject = ['$resource'];

    function Conversation ($resource) {
        var resourceUrl =  'messageservice/api/conversation/:id';

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
