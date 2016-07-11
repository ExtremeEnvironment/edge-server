'use strict';

describe('Controller Tests', function() {

    describe('Area Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockArea, MockCorner, MockNgo, MockDisaster;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockArea = jasmine.createSpy('MockArea');
            MockCorner = jasmine.createSpy('MockCorner');
            MockNgo = jasmine.createSpy('MockNgo');
            MockDisaster = jasmine.createSpy('MockDisaster');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Area': MockArea,
                'Corner': MockCorner,
                'Ngo': MockNgo,
                'Disaster': MockDisaster
            };
            createController = function() {
                $injector.get('$controller')("AreaDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'edgeServerApp:areaUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
