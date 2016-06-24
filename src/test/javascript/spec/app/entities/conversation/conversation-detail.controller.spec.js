'use strict';

describe('Controller Tests', function() {

    describe('Conversation Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockConversation, MockUser, MockMessage;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockConversation = jasmine.createSpy('MockConversation');
            MockUser = jasmine.createSpy('MockUser');
            MockMessage = jasmine.createSpy('MockMessage');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Conversation': MockConversation,
                'User': MockUser,
                'Message': MockMessage
            };
            createController = function() {
                $injector.get('$controller')("ConversationDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'edgeServerApp:conversationUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
