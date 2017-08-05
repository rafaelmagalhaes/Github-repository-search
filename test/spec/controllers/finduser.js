'use strict';

describe('Controller: FindUser', function () {

    // load the controller's module
    beforeEach(module('angularjsGithubApp'));

    var AboutCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        AboutCtrl = $controller('FindUser', {
            $scope: scope
            // place here mocked dependencies
        });
    }));

    it('username should be empty', function () {
        expect(AboutCtrl.userName).toBeUndefined();
    });
});
