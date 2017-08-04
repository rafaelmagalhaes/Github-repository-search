'use strict';

app.factory('GithubApi', function ($http) {

    var API = 'https://api.github.com/';

    return {
        getRepos: function (data) {
            return $http.get(API + 'search/repositories?q=' + data);
        },
        getUser: function (data) {
            return $http.get(API + 'search/users?q=' + data);
        },
        getIssues: function (data) {
            return $http.get(API + 'search/issues?q=repo:' + data);
        },
        getSingleRepo: function (data) {
            return $http.get(API + 'repos/' + data);
        }

    };

});