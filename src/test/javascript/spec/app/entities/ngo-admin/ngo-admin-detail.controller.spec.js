'use strict';

describe('Controller Tests', function() {

    describe('NgoAdmin Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockNgoAdmin, MockUser;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockNgoAdmin = jasmine.createSpy('MockNgoAdmin');
            MockUser = jasmine.createSpy('MockUser');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'NgoAdmin': MockNgoAdmin,
                'User': MockUser
            };
            createController = function() {
                $injector.get('$controller')("NgoAdminDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'edgeServerApp:ngoAdminUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
