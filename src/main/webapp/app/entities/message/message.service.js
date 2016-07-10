(function() {
    'use strict';
    angular
    .module('edgeServerApp')
    .factory('Message', Message);

    Message.$inject = ['$resource'];

    function Message ($resource) {
     var resourceUrl =  'messageservice/api/conversations/';
     var resourceUr2 =  'messageservice/api/conversations/:id/messages';
     var resourceUr3 =  'messageservice/api/conversations/:conversationId/messages';
/*       var resourceUrl2 =  'disasterservice/api/disasters/:id';
       var resourceUrl3 =  'disasterservice/api/action-objects/:id';
       var resourceUrl4 =  'disasterservice/api/categories/:id';
       var resourceUrl5 =  'disasterservice/api/action-objects/topten/:id';
       var resourceUrl6 = 'disasterservice/api/disaster-types/';*/

       return {
        conversations: $resource(resourceUrl, {}, {
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
        messages: $resource(resourceUr2, {}, {
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
        newmessage: $resource(resourceUr3, {}, {
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
        /*,
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
        })*/
    };
}
})();
