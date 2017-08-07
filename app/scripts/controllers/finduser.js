'use strict';

app.controller('FindUser', function ($scope, GithubApi) {
  $scope.userName = '';

  $scope.userNotFound = false;
  $scope.loaded = false;
  $scope.loading = false;
  $scope.Search = function () {
    $scope.loading = true;

    GithubApi.getUser($scope.userName).then(function (data) {
      $scope.user = data.data;
      $scope.loaded = true;
      $scope.userNotFound = false;
      $scope.loading = false;

    }).catch(function () {
      $scope.userNotFound = true;
      $scope.loaded = false;
    });
    GithubApi.getUserRepos($scope.userName).then(function (data) {
      $scope.repos = data.data;
      $scope.reposFound = $scope.repos.length > 0;
    });
  };


  $scope.clearUser = function () {
    $scope.userName = '';
    $scope.loaded = false;
    $scope.userNotFound = false;
  };

});
