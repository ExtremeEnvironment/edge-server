(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('offers', {
            parent: 'app',
            url: '/offers',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.offers.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/offers/offers.html',
                    controller: 'OffersController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('offers');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('offers-detail', {
            parent: 'entity',
            url: '/offers/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'edgeServerApp.offers.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/offers/offers-detail.html',
                    controller: 'OffersDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('offers');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Offers', function($stateParams, Offers) {
                    return Offers.get({id : $stateParams.id}).$promise;
                }]
            }
        })




        
        .state('offers.new', {
            parent: 'offers',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/offers/offers-dialog.html',
                    controller: 'OffersDialogController',
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
                    $state.go('offers', null, { reload: true });
                }, function() {
                    $state.go('offers');
                });
            }]
        })





        .state('offers.edit', {
            parent: 'offers',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/offers/offers-dialog.html',
                    controller: 'OffersDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Offers', function(Offers) {
                            return Offers.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('offers', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('offers.delete', {
            parent: 'offers',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/offers/offers-delete-dialog.html',
                    controller: 'OffersDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Offers', function(Offers) {
                            return Offers.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('offers', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
