'use strict';


app.controller('MainCtrl', function ($scope, GithubApi) {

  $scope.repoNotFound = false;
  $scope.loaded = false;
  $scope.loading = false;
  $scope.repository = '';

  $scope.Search = function () {
    $scope.loading = true;
    $scope.httpPromise = GithubApi.getRepos($scope.repository)
      .then(function (data) {
        $scope.loaded = true;
        $scope.repo = data.data;
        $scope.repoNotFound = false;
        $scope.loading = false;
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
