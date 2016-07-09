(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('disaster-type-admin', {
            parent: 'app',
            url: '/disaster-type-admin',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'edgeServerApp.disasterTypeAdmin.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/disaster-type-admin/disaster-type-admins.html',
                    controller: 'DisasterTypeAdminController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('disasterTypeAdmin');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('disaster-type-admin-detail', {
            parent: 'entity',
            url: '/disaster-type-admin/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'edgeServerApp.disasterTypeAdmin.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/disaster-type-admin/disaster-type-admin-detail.html',
                    controller: 'DisasterTypeAdminDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('disasterTypeAdmin');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'DisasterTypeAdmin', function($stateParams, DisasterTypeAdmin) {
                    return DisasterTypeAdmin.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('disaster-type-admin.new', {
            parent: 'disaster-type-admin',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/disaster-type-admin/disaster-type-admin-dialog.html',
                    controller: 'DisasterTypeAdminDialogController',
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
                    $state.go('disaster-type-admin', null, { reload: true });
                }, function() {
                    $state.go('disaster-type-admin');
                });
            }]
        })
        .state('disaster-type-admin.edit', {
            parent: 'disaster-type-admin',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/disaster-type-admin/disaster-type-admin-dialog.html',
                    controller: 'DisasterTypeAdminDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['DisasterTypeAdmin', function(DisasterTypeAdmin) {
                            return DisasterTypeAdmin.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('disaster-type-admin', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('disaster-type-admin.delete', {
            parent: 'disaster-type-admin',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/disaster-type-admin/disaster-type-admin-delete-dialog.html',
                    controller: 'DisasterTypeAdminDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['DisasterTypeAdmin', function(DisasterTypeAdmin) {
                            return DisasterTypeAdmin.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('disaster-type-admin', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
