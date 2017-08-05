/**
 * Created by rrrm9 on 04/08/2017.
 */
'use strict';

app.controller('SingleRepo', function ($scope, GithubApi, $routeParams) {
    $scope.repo = $routeParams.repo + '/' + $routeParams.repo1;

    $scope.limit = 3;
    $scope.showIssues = false;
    $scope.showCharts = true;
    $scope.openIssues = function (item) {
        return item.state === 'open';
    };


    GithubApi.getSingleRepo($scope.repo).then(function (data) {
        $scope.repository = data.data;
        $scope.LoadChart();
        GithubApi.getIssues($scope.repo).then(function (data) {
            $scope.issues = data.data;
        });
    }).catch(function (status) {
        console.log(status);
    });

    $scope.LoadChart = function () {
        $scope.labels = ["Open Isues", "Forks", "stargazers", "watchers", "network", "subscribers"];
        $scope.series = ['Series A'];
        $scope.data = [
            [$scope.repository.open_issues_count,// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
                $scope.repository.forks,// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
                $scope.repository.stargazers_count,// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
                $scope.repository.watchers_count,// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
                $scope.repository.network_count,// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
                $scope.repository.subscribers_count// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
            ]
        ];
        $scope.datasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
        $scope.colors = ['rgb(159,204,0)','rgb(250,109,33)','rgb(154,154,154)'];
        $scope.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            }
        };
    }

});
