(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .factory('Password', Password);

    Password.$inject = ['$resource'];

    function Password($resource) {
        var service = $resource('userservice/api/account/change_password', {}, {});

        return service;
    }
})();
