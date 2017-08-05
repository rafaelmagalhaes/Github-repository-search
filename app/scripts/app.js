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
    'ngMaterial',
    'chart.js'
]);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/finduser', {
            templateUrl: 'views/user.html',
            controller: 'FindUser',
            controllerAs: 'findUser'
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


