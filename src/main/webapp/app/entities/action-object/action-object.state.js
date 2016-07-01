(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('action-object', {
            parent: 'app',
            url: '/action-object',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'edgeServerApp.actionObject.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/action-object/action-objects.html',
                    controller: 'ActionObjectController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('actionObject');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
            
        .state('action-object-detail', {
            parent: 'entity',
            url: '/action-object/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'edgeServerApp.actionObject.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/action-object/action-object-detail.html',
                    controller: 'ActionObjectDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('actionObject');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'ActionObject', function($stateParams, ActionObject) {
                    return ActionObject.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('action-object.new', {
            parent: 'action-object',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/action-object/action-object-dialog.html',
                    controller: 'ActionObjectDialogController',
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
                    $state.go('action-object', null, { reload: true });
                }, function() {
                    $state.go('action-object');
                });
            }]
        })
        .state('action-object.edit', {
            parent: 'action-object',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/action-object/action-object-dialog.html',
                    controller: 'ActionObjectDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ActionObject', function(ActionObject) {
                            return ActionObject.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('action-object', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('action-object.delete', {
            parent: 'action-object',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/action-object/action-object-delete-dialog.html',
                    controller: 'ActionObjectDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ActionObject', function(ActionObject) {
                            return ActionObject.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('action-object', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
