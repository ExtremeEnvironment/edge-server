(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('disaster-type', {
            parent: 'app',
            url: '/disaster-type',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'edgeServerApp.disasterType.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/disaster-type/disaster-types.html',
                    controller: 'DisasterTypeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('disasterType');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('disaster-type-detail', {
            parent: 'entity',
            url: '/disaster-type/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'edgeServerApp.disasterType.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/disaster-type/disaster-type-detail.html',
                    controller: 'DisasterTypeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('disasterType');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'DisasterType', function($stateParams, DisasterType) {
                    return DisasterType.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('disaster-type.new', {
            parent: 'disaster-type',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/disaster-type/disaster-type-dialog.html',
                    controller: 'DisasterTypeDialogController',
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
                    $state.go('disaster-type', null, { reload: true });
                }, function() {
                    $state.go('disaster-type');
                });
            }]
        })
        .state('disaster-type.edit', {
            parent: 'disaster-type',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/disaster-type/disaster-type-dialog.html',
                    controller: 'DisasterTypeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['DisasterType', function(DisasterType) {
                            return DisasterType.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('disaster-type', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('disaster-type.delete', {
            parent: 'disaster-type',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/disaster-type/disaster-type-delete-dialog.html',
                    controller: 'DisasterTypeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['DisasterType', function(DisasterType) {
                            return DisasterType.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('disaster-type', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
