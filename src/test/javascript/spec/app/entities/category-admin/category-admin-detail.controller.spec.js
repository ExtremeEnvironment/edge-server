'use strict';

describe('Controller Tests', function() {

    describe('CategoryAdmin Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockCategoryAdmin, MockActionObject;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockCategoryAdmin = jasmine.createSpy('MockCategoryAdmin');
            MockActionObject = jasmine.createSpy('MockActionObject');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'CategoryAdmin': MockCategoryAdmin,
                'ActionObject': MockActionObject
            };
            createController = function() {
                $injector.get('$controller')("CategoryAdminDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'edgeServerApp:categoryAdminUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
