(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('give', {
            parent: 'app',
            url: '/give?userID',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.give.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/give/gives.html',
                    controller: 'GiveController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('give');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('give-detail', {
            parent: 'entity',
            url: '/give/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.give.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/give/give-detail.html',
                    controller: 'GiveDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('give');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Give', function($stateParams, Give) {
                    return Give.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('give.new', {
            parent: 'give',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/give/give-dialog.html',
                    controller: 'GiveDialogController',
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
                    $state.go('give', null, { reload: true });
                }, function() {
                    $state.go('give');
                });
            }]
        })
        .state('give.edit', {
            parent: 'give',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/give/give-dialog.html',
                    controller: 'GiveDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Give', function(Give) {
                            return Give.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('give', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('give.delete', {
            parent: 'give',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/give/give-delete-dialog.html',
                    controller: 'GiveDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Give', function(Give) {
                            return Give.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('give', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
