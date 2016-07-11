'use strict';

describe('Controller Tests', function() {

    describe('ActionObjectAdmin Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockActionObjectAdmin, MockAction, MockCategory;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockActionObjectAdmin = jasmine.createSpy('MockActionObjectAdmin');
            MockAction = jasmine.createSpy('MockAction');
            MockCategory = jasmine.createSpy('MockCategory');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'ActionObjectAdmin': MockActionObjectAdmin,
                'Action': MockAction,
                'Category': MockCategory
            };
            createController = function() {
                $injector.get('$controller')("ActionObjectAdminDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'edgeServerApp:actionObjectAdminUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
