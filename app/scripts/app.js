'use strict';
var app = angular.module('angularjsGithubApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial'
]);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl',
            controllerAs: 'about'
        })
        .when('/:repo/:repo1', {
            templateUrl: 'views/singleRepo.html',
            controller: 'SingleRepo',
            controllerAs: 'singleRepo'
        })
        .otherwise({
            redirectTo: '/'
        });

});


