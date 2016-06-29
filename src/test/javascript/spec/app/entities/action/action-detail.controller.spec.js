'use strict';

describe('Controller Tests', function() {

    describe('Action Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockAction, MockDisaster, MockUser, MockActionObject;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockAction = jasmine.createSpy('MockAction');
            MockDisaster = jasmine.createSpy('MockDisaster');
            MockUser = jasmine.createSpy('MockUser');
            MockActionObject = jasmine.createSpy('MockActionObject');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Action': MockAction,
                'Disaster': MockDisaster,
                'User': MockUser,
                'ActionObject': MockActionObject
            };
            createController = function() {
                $injector.get('$controller')("ActionDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'edgeServerApp:actionUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
