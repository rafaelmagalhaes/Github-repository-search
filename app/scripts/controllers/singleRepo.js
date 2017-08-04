/**
 * Created by rrrm9 on 04/08/2017.
 */
'use strict';

app.controller('SingleRepo', function ($scope, GithubApi, $routeParams) {
    $scope.repo = $routeParams.repo + '/' + $routeParams.repo1;
    GithubApi.getSingleRepo($scope.repo).then(function (data) {
        $scope.repository = data.data;
        GithubApi.getIssues($scope.repo).then(function (data) {
            $scope.issues = data.data;
        });
    }).catch(function (status) {
        console.log(status);
    });
});
