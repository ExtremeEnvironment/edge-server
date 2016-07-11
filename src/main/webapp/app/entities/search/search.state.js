(function() {
    'use strict';

    angular
    .module('edgeServerApp')
    .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('search', {
            parent: 'app',
            url: '/search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.search.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/search/searches.html',
                    controller: 'SearchController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('search');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('search-detail', {
            parent: 'entity',
            url: '/search/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.search.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/search/search-detail.html',
                    controller: 'SearchDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('search');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Search', function($stateParams, Search) {
                    return Search.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('search.new', {
            parent: 'search',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/search/search-dialog.html',
                    controller: 'SearchDialogController',
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
                    $state.go('search', null, { reload: true });
                }, function() {
                    $state.go('search');
                });
            }]
        })
        .state('search.edit', {
            parent: 'search',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/search/search-dialog.html',
                    controller: 'SearchDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Search', function(Search) {
                            return Search.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('search', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('search.delete', {
            parent: 'search',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/search/search-delete-dialog.html',
                    controller: 'SearchDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Search', function(Search) {
                            return Search.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('search', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
