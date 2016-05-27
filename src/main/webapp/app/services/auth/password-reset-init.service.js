(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .factory('PasswordResetInit', PasswordResetInit);

    PasswordResetInit.$inject = ['$resource'];

    function PasswordResetInit($resource) {
        var service = $resource('userservice/api/account/reset_password/init', {}, {});

        return service;
    }
})();
