(function () {
    'use strict';

    angular
        .module('edgeServerApp')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('userservice/api/register', {}, {});
    }
})();
