(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('CategoryAdminController', CategoryAdminController);

    CategoryAdminController.$inject = ['$scope', '$state', 'CategoryAdmin'];

    function CategoryAdminController ($scope, $state, CategoryAdmin) {
        var vm = this;
        
        vm.categoryAdmins = [];

        loadAll();

        function loadAll() {
            CategoryAdmin.query(function(result) {
                vm.categoryAdmins = result;
            });
        }
    }
})();
