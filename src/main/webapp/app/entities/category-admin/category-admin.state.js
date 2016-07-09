(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('category-admin', {
            parent: 'app',
            url: '/category-admin',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'edgeServerApp.categoryAdmin.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/category-admin/category-admins.html',
                    controller: 'CategoryAdminController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('categoryAdmin');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('category-admin-detail', {
            parent: 'entity',
            url: '/category-admin/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'edgeServerApp.categoryAdmin.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/category-admin/category-admin-detail.html',
                    controller: 'CategoryAdminDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('categoryAdmin');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'CategoryAdmin', function($stateParams, CategoryAdmin) {
                    return CategoryAdmin.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('category-admin.new', {
            parent: 'category-admin',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/category-admin/category-admin-dialog.html',
                    controller: 'CategoryAdminDialogController',
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
                    $state.go('category-admin', null, { reload: true });
                }, function() {
                    $state.go('category-admin');
                });
            }]
        })
        .state('category-admin.edit', {
            parent: 'category-admin',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/category-admin/category-admin-dialog.html',
                    controller: 'CategoryAdminDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['CategoryAdmin', function(CategoryAdmin) {
                            return CategoryAdmin.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('category-admin', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('category-admin.delete', {
            parent: 'category-admin',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/category-admin/category-admin-delete-dialog.html',
                    controller: 'CategoryAdminDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['CategoryAdmin', function(CategoryAdmin) {
                            return CategoryAdmin.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('category-admin', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
