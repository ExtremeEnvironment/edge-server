(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('message', {
            parent: 'app',
            url: '/message',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.message.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/message/messages.html',
                    controller: 'MessageController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('message');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('message-detail', {
            parent: 'app',
            url: '/message/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.message.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/message/message-detail.html',
                    controller: 'MessageDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('message');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Message', function($stateParams, Message) {
                    return Message.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('message.new', {
            parent: 'message',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/message/message-dialog.html',
                    controller: 'MessageDialogController',
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
                    $state.go('message', null, { reload: true });
                }, function() {
                    $state.go('message');
                });
            }]
        })
        .state('message.edit', {
            parent: 'message',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/message/message-dialog.html',
                    controller: 'MessageDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Message', function(Message) {
                            return Message.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('message', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('message.delete', {
            parent: 'message',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/message/message-delete-dialog.html',
                    controller: 'MessageDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Message', function(Message) {
                            return Message.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('message', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
