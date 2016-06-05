(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('disaster', {
            parent: 'app',
            url: '/disaster?disasterID',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.disaster.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/disaster/disasters.html',
                    controller: 'DisasterController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('disaster');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('disaster-detail', {
            parent: 'entity',
            url: '/disaster/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.disaster.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/disaster/disaster-detail.html',
                    controller: 'DisasterDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('disaster');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Disaster', function($stateParams, Disaster) {
                    return Disaster.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('disaster.new', {
            parent: 'disaster',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/disaster/disaster-dialog.html',
                    controller: 'DisasterDialogController',
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
                    $state.go('disaster', null, { reload: true });
                }, function() {
                    $state.go('disaster');
                });
            }]
        })
        .state('disaster.edit', {
            parent: 'disaster',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/disaster/disaster-dialog.html',
                    controller: 'DisasterDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Disaster', function(Disaster) {
                            return Disaster.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('disaster', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('disaster.delete', {
            parent: 'disaster',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/disaster/disaster-delete-dialog.html',
                    controller: 'DisasterDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Disaster', function(Disaster) {
                            return Disaster.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('disaster', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
