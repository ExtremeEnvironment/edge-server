(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('conversation', {
            parent: 'app',
            url: '/conversation',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.conversation.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/conversation/conversations.html',
                    controller: 'ConversationController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('conversation');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('conversation-detail', {
            parent: 'app',
            url: '/conversation/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.conversation.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/conversation/conversation-detail.html',
                    controller: 'ConversationDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('conversation');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Conversation', function($stateParams, Conversation) {
                    return Conversation.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('conversation.new', {
            parent: 'conversation',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/conversation/conversation-dialog.html',
                    controller: 'ConversationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                title: null,
                                active: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('conversation', null, { reload: true });
                }, function() {
                    $state.go('conversation');
                });
            }]
        })
        .state('conversation.edit', {
            parent: 'conversation',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/conversation/conversation-dialog.html',
                    controller: 'ConversationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Conversation', function(Conversation) {
                            return Conversation.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('conversation', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('conversation.delete', {
            parent: 'conversation',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/conversation/conversation-delete-dialog.html',
                    controller: 'ConversationDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Conversation', function(Conversation) {
                            return Conversation.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('conversation', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
