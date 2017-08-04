'use strict';


app.controller('MainCtrl', function ($scope, GithubApi) {

    $scope.repoNotFound = false;
    $scope.loaded = false;

    $scope.Search = function () {
        console.log($scope.repository);
        GithubApi.getRepos($scope.repository)
            .then(function (data) {
                $scope.loaded = true;
                $scope.repo = data.data;
            })
            .catch(function () {
                $scope.repoNotFound = true;
            });

    };

    $scope.clearUser = function () {
        $scope.repository = '';
        $scope.loaded = false;

    };

});
