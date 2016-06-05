'use strict';

describe('Controller Tests', function() {

    describe('Newdisaster Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockNewdisaster;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockNewdisaster = jasmine.createSpy('MockNewdisaster');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Newdisaster': MockNewdisaster
            };
            createController = function() {
                $injector.get('$controller')("NewdisasterDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'edgeServerApp:newdisasterUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
