'use strict';

describe('Controller Tests', function() {

    describe('ActionObject Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockActionObject, MockAction, MockCategory;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockActionObject = jasmine.createSpy('MockActionObject');
            MockAction = jasmine.createSpy('MockAction');
            MockCategory = jasmine.createSpy('MockCategory');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'ActionObject': MockActionObject,
                'Action': MockAction,
                'Category': MockCategory
            };
            createController = function() {
                $injector.get('$controller')("ActionObjectDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'edgeServerApp:actionObjectUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
