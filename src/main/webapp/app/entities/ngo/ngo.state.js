(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('ngo', {
            parent: 'app',
            url: '/ngo',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.ngo.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/ngo/ngos.html',
                    controller: 'NgoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('ngo');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('ngo-detail', {
            parent: 'entity',
            url: '/ngo/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.ngo.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/ngo/ngo-detail.html',
                    controller: 'NgoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('ngo');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Ngo', function($stateParams, Ngo) {
                    return Ngo.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('ngo.new', {
            parent: 'ngo',
            url: '/new?ngoID',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ngo/ngo-dialog.html',
                    controller: 'NgoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('ngo', null, { reload: true });
                }, function() {
                    $state.go('ngo');
                });
            }]
        })
        .state('ngo.edit', {
            parent: 'ngo',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ngo/ngo-dialog.html',
                    controller: 'NgoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Ngo', function(Ngo) {
                            return Ngo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('ngo', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('ngo.delete', {
            parent: 'ngo',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ngo/ngo-delete-dialog.html',
                    controller: 'NgoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Ngo', function(Ngo) {
                            return Ngo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('ngo', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
