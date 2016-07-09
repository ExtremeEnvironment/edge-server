(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('action-object-admin', {
            parent: 'app',
            url: '/action-object-admin',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'edgeServerApp.actionObjectAdmin.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/action-object-admin/action-object-admins.html',
                    controller: 'ActionObjectAdminController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('actionObjectAdmin');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('action-object-admin-detail', {
            parent: 'entity',
            url: '/action-object-admin/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'edgeServerApp.actionObjectAdmin.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/action-object-admin/action-object-admin-detail.html',
                    controller: 'ActionObjectAdminDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('actionObjectAdmin');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'ActionObjectAdmin', function($stateParams, ActionObjectAdmin) {
                    return ActionObjectAdmin.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('action-object-admin.new', {
            parent: 'action-object-admin',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/action-object-admin/action-object-admin-dialog.html',
                    controller: 'ActionObjectAdminDialogController',
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
                    $state.go('action-object-admin', null, { reload: true });
                }, function() {
                    $state.go('action-object-admin');
                });
            }]
        })
        .state('action-object-admin.edit', {
            parent: 'action-object-admin',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/action-object-admin/action-object-admin-dialog.html',
                    controller: 'ActionObjectAdminDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ActionObjectAdmin', function(ActionObjectAdmin) {
                            return ActionObjectAdmin.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('action-object-admin', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('action-object-admin.delete', {
            parent: 'action-object-admin',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/action-object-admin/action-object-admin-delete-dialog.html',
                    controller: 'ActionObjectAdminDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ActionObjectAdmin', function(ActionObjectAdmin) {
                            return ActionObjectAdmin.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('action-object-admin', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
