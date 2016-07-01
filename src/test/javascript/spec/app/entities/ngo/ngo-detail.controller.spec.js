'use strict';

describe('Controller Tests', function() {

    describe('Ngo Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockNgo, MockArea;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockNgo = jasmine.createSpy('MockNgo');
            MockArea = jasmine.createSpy('MockArea');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Ngo': MockNgo,
                'Area': MockArea
            };
            createController = function() {
                $injector.get('$controller')("NgoDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'edgeServerApp:ngoUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
