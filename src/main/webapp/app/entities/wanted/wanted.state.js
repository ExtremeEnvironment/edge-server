(function() {
    'use strict';

    angular
    .module('edgeServerApp')
    .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('wanted', {
            parent: 'app',
            url: '/wanted?UserId',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.wanted.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/wanted/wanteds.html',
                    controller: 'WantedController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('wanted');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('wanted.new', {
            parent: 'wanted',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/wanted/wanted-dialog.html',
                    controller: 'WantedDialogController',
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
                    $state.go('wanted', null, { reload: true });
                }, function() {
                    $state.go('wanted');
                });
            }]
        })

        .state('wanted-detail', {
            parent: 'entity',
            url: '/wanted/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.wanted.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/wanted/wanted-detail.html',
                    controller: 'wantedDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('wanted');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'wanted', function($stateParams, wanted) {
                    return wanted.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('wanted.edit', {
            parent: 'wanted',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/wanted/wanted-dialog.html',
                    controller: 'wantedDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['wanted', function(wanted) {
                            return wanted.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('wanted', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('wanted.delete', {
            parent: 'wanted',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/wanted/wanted-delete-dialog.html',
                    controller: 'wantedDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['wanted', function(wanted) {
                            return wanted.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('wanted', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
