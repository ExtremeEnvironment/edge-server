'use strict';

describe('Controller Tests', function() {

    describe('DisasterType Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockDisasterType, MockDisaster;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockDisasterType = jasmine.createSpy('MockDisasterType');
            MockDisaster = jasmine.createSpy('MockDisaster');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'DisasterType': MockDisasterType,
                'Disaster': MockDisaster
            };
            createController = function() {
                $injector.get('$controller')("DisasterTypeDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'edgeServerApp:disasterTypeUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
