'use strict';


app.controller('MainCtrl', function ($scope, GithubApi) {

    $scope.repoNotFound = false;
    $scope.loaded = false;

    $scope.Search = function () {
        GithubApi.getRepos($scope.repository)
            .then(function (data) {
                $scope.loaded = true;
                $scope.repo = data.data;
                if ($scope.repo.total_count === 0) {
                    $scope.repoNotFound = true;
                    $scope.loaded = false;
                }
            })
            .catch(function () {
                $scope.repoNotFound = true;
                $scope.loaded = false;

            });
    };
    $scope.clearUser = function () {
        $scope.repository = '';
        $scope.loaded = false;
        $scope.repoNotFound = false;
    };
});
