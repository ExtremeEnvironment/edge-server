(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('area', {
            parent: 'entity',
            url: '/area',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.area.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/area/areas.html',
                    controller: 'AreaController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('area');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('area-detail', {
            parent: 'entity',
            url: '/area/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.area.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/area/area-detail.html',
                    controller: 'AreaDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('area');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Area', function($stateParams, Area) {
                    return Area.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('area.new', {
            parent: 'area',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/area/area-dialog.html',
                    controller: 'AreaDialogController',
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
                    $state.go('area', null, { reload: true });
                }, function() {
                    $state.go('area');
                });
            }]
        })
        .state('area.edit', {
            parent: 'area',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/area/area-dialog.html',
                    controller: 'AreaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Area', function(Area) {
                            return Area.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('area', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('area.delete', {
            parent: 'area',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/area/area-delete-dialog.html',
                    controller: 'AreaDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Area', function(Area) {
                            return Area.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('area', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
