'use strict';

describe('Controller Tests', function() {

    describe('DisasterTypeAdmin Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockDisasterTypeAdmin, MockDisaster;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockDisasterTypeAdmin = jasmine.createSpy('MockDisasterTypeAdmin');
            MockDisaster = jasmine.createSpy('MockDisaster');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'DisasterTypeAdmin': MockDisasterTypeAdmin,
                'Disaster': MockDisaster
            };
            createController = function() {
                $injector.get('$controller')("DisasterTypeAdminDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'edgeServerApp:disasterTypeAdminUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
