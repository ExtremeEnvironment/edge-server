(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .factory('PasswordResetFinish', PasswordResetFinish);

    PasswordResetFinish.$inject = ['$resource'];

    function PasswordResetFinish($resource) {
        var service = $resource('userservice/api/account/reset_password/finish', {}, {});

        return service;
    }
})();
