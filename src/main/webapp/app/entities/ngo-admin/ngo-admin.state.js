(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('ngo-admin', {
            parent: 'app',
            url: '/ngo-admin',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'edgeServerApp.ngoAdmin.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/ngo-admin/ngo-admins.html',
                    controller: 'NgoAdminController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('ngoAdmin');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('ngo-admin-detail', {
            parent: 'entity',
            url: '/ngo-admin/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'edgeServerApp.ngoAdmin.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/ngo-admin/ngo-admin-detail.html',
                    controller: 'NgoAdminDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('ngoAdmin');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'NgoAdmin', function($stateParams, NgoAdmin) {
                    return NgoAdmin.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('ngo-admin.new', {
            parent: 'ngo-admin',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ngo-admin/ngo-admin-dialog.html',
                    controller: 'NgoAdminDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('ngo-admin', null, { reload: true });
                }, function() {
                    $state.go('ngo-admin');
                });
            }]
        })
        .state('ngo-admin.edit', {
            parent: 'ngo-admin',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ngo-admin/ngo-admin-dialog.html',
                    controller: 'NgoAdminDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['NgoAdmin', function(NgoAdmin) {
                            return NgoAdmin.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('ngo-admin', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('ngo-admin.delete', {
            parent: 'ngo-admin',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ngo-admin/ngo-admin-delete-dialog.html',
                    controller: 'NgoAdminDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['NgoAdmin', function(NgoAdmin) {
                            return NgoAdmin.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('ngo-admin', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
