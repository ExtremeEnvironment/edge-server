'use strict';

describe('Controller Tests', function() {

    describe('Offers Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockOffers;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockOffers = jasmine.createSpy('MockOffers');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Offers': MockOffers
            };
            createController = function() {
                $injector.get('$controller')("OffersDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'edgeServerApp:offersUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
