(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('newdisaster', {
            parent: 'app',
            url: '/newdisaster?userID',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.newdisaster.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/newdisaster/newdisasters.html',
                    controller: 'NewdisasterController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('newdisaster');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('newdisaster-detail', {
            parent: 'entity',
            url: '/newdisaster/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.newdisaster.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/newdisaster/newdisaster-detail.html',
                    controller: 'NewdisasterDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('newdisaster');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Newdisaster', function($stateParams, Newdisaster) {
                    return Newdisaster.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('newdisaster.new', {
            parent: 'newdisaster',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/newdisaster/newdisaster-dialog.html',
                    controller: 'NewdisasterDialogController',
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
                    $state.go('newdisaster', null, { reload: true });
                }, function() {
                    $state.go('newdisaster');
                });
            }]
        })
        .state('newdisaster.edit', {
            parent: 'newdisaster',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/newdisaster/newdisaster-dialog.html',
                    controller: 'NewdisasterDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Newdisaster', function(Newdisaster) {
                            return Newdisaster.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('newdisaster', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('newdisaster.delete', {
            parent: 'newdisaster',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/newdisaster/newdisaster-delete-dialog.html',
                    controller: 'NewdisasterDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Newdisaster', function(Newdisaster) {
                            return Newdisaster.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('newdisaster', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
