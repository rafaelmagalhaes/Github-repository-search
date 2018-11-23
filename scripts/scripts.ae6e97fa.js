"use strict";var app=angular.module("angularjsGithubApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial","chart.js"]);app.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/finduser",{templateUrl:"views/user.html",controller:"FindUser",controllerAs:"findUser"}).when("/:repo/:repo1",{templateUrl:"views/singleRepo.html",controller:"SingleRepo",controllerAs:"singleRepo"}).otherwise({redirectTo:"/"})}]),app.controller("AppController",["$scope",function(a){a.currentNavItem="Home"}]),app.controller("MainCtrl",["$scope","GithubApi",function(a,b){a.repoNotFound=!1,a.loaded=!1,a.loading=!1,a.repository="",a.Search=function(){a.loading=!0,a.httpPromise=b.getRepos(a.repository).then(function(b){a.loaded=!0,a.repo=b.data,a.repoNotFound=!1,a.loading=!1,0===a.repo.total_count&&(a.repoNotFound=!0,a.loaded=!1)})["catch"](function(){a.repoNotFound=!0,a.loaded=!1})},a.clearUser=function(){a.repository="",a.loaded=!1,a.repoNotFound=!1}}]),app.controller("FindUser",["$scope","GithubApi",function(a,b){a.userName="",a.userNotFound=!1,a.loaded=!1,a.loading=!1,a.Search=function(){a.loading=!0,b.getUser(a.userName).then(function(b){a.user=b.data,a.loaded=!0,a.userNotFound=!1,a.loading=!1})["catch"](function(){a.userNotFound=!0,a.loaded=!1}),b.getUserRepos(a.userName).then(function(b){a.repos=b.data,a.reposFound=a.repos.length>0})},a.clearUser=function(){a.userName="",a.loaded=!1,a.userNotFound=!1}}]),app.controller("SingleRepo",["$scope","GithubApi","$routeParams","filterFilter",function(a,b,c,d){a.repo=c.repo+"/"+c.repo1,a.limit=3,a.showIssues=!1,a.showCharts=!1,a.openIssues=function(a){return"open"===a.state},b.getSingleRepo(a.repo).then(function(c){a.repository=c.data,a.LoadChart(),b.getIssues(a.repo).then(function(b){a.issues=b.data})})["catch"](function(a){console.log(a)}),a.getCount=function(b){return d(a.issues.items,{state:b}).length},a.LoadChart=function(){a.labels=["Open Isues","Forks","stargazers","watchers","network","subscribers"],a.series=["Series A"],a.data=[[a.repository.open_issues_count,a.repository.forks,a.repository.stargazers_count,a.repository.watchers_count,a.repository.network_count,a.repository.subscribers_count]],a.datasetOverride=[{yAxisID:"y-axis-1"},{yAxisID:"y-axis-2"}],a.colors=["rgb(159,204,0)","rgb(250,109,33)","rgb(154,154,154)"],a.options={scales:{yAxes:[{id:"y-axis-1",type:"linear",display:!0,position:"left"},{id:"y-axis-2",type:"linear",display:!0,position:"right"}]}}}}]),app.factory("GithubApi",["$http",function(a){var b="https://api.github.com/";return{getRepos:function(c){return a.get(b+"search/repositories?q="+c)},getUser:function(c){return a.get(b+"users/"+c)},getUserRepos:function(c){return a.get(b+"users/"+c+"/repos")},getIssues:function(c){return a.get(b+"search/issues?q=repo:"+c)},getSingleRepo:function(c){return a.get(b+"repos/"+c)}}}]),angular.module("angularjsGithubApp").run(["$templateCache",function(a){a.put("views/main.html",'<div layout="row" layout-align="center center"> <md-card flex="50" flex-md="100" flex-sm="100" flex-xs="100"> <md-card-title> <md-card-title-text> <span class="md-headline" layout="row" layout-align="center center">Find a repository on Github</span> </md-card-title-text> </md-card-title> <md-card-content> <a class="md-accent">Enter a repository name below and click the button to display profile info. </a> <md-input-container layout-gt-lg class="md-block"> <label>Repository </label> <input ng-keyup="$event.keyCode == 13 ? Search() : null" ng-model="repository"> </md-input-container> </md-card-content> <md-card-actions layout="row" layout-align="end center"> <md-button class="md-accent" ng-disabled="!(repository)" ng-click="Search()">Search</md-button> <md-button class="md-accent" ng-click="clearUser()">Clear</md-button> </md-card-actions> </md-card> </div> <div ng-show="repoNotFound" layout="row" layout-align="center center"> <md-content flex="50" flex-md="100" flex-sm="100" flex-xs="100" layout-padding> <h2>We couldn’t find any repositories matching <span ng-bind="repository | limitTo:15 "></span> <span ng-if="repository.length > 15">...</span> </h2> </md-content> </div> <div layout="row" layout-align="center center"> <md-progress-circular ng-show="loading" md-mode="indeterminate"></md-progress-circular> </div> <div ng-show="loaded " layout="row" layout-align="center center"> <md-list flex="50" flex-md="100" flex-sm="100" flex-xs="100"> <md-subheader class="md-no-sticky">Found the following repositories</md-subheader> <md-list-item ng-repeat="item in repo.items" class="md-3-line" ng-href="#!/{{item.full_name}}"> <img ng-src="{{item.owner.avatar_url}}" class="md-avatar"> <div class="md-list-item-text" layout="column"> <h3>{{ item.full_name }}</h3> <h4>{{ item.description }}</h4> </div> </md-list-item> <md-divider></md-divider> </md-list> </div>'),a.put("views/singleRepo.html",'<div layout="row" layout-align="center center"> <md-card flex="50" flex-md="100" flex-sm="100" flex-xs="100"> <md-card-title> <md-card-title-text> <span class="md-headline" layout="row" layout-align="center center"> <a class="md-accent" ng-href="{{repository.html_url}}" target="_blank"> <i class="fa fa-github" aria-hidden="true"></i>{{repository.name}}</a> </span> </md-card-title-text> </md-card-title> <md-card-content> <div layout="column"> <div flex> <p class="md-accent">{{repository.description}}</p> </div> </div> <div layout="row" layout-xs="column"> <div flex="30" flex-xs="100"> <p> Open issues <i class="fa fa-exclamation" aria-hidden="true"></i> {{repository.open_issues_count}}</p> </div> <div flex="30" flex-xs="100"> <p> forks <i class="fa fa-code-fork" aria-hidden="true"></i> {{repository.forks}}</p> </div> <div flex="30" flex-xs="100"> <p>size {{repository.size}}</p> </div> </div> <div layout="row" layout-xs="column"> <div flex="30" flex-xs="100"> <p>stargazers<i class="fa fa-star" aria-hidden="true"></i> {{repository.stargazers_count}}</p> </div> <div flex="30" flex-xs="100"> <p> watchers <i class="fa fa-star" aria-hidden="true"></i>{{repository.watchers_count}}</p> </div> <div flex="30" flex-xs="100"> <p> Language <i class="fa fa-language" aria-hidden="true"></i> {{repository.language}}</p> </div> </div> <div layout="row" layout-xs="column"> <div flex="30" flex-xs="100"> <p>branch {{repository.default_branch}}</p> </div> <div flex="30" flex-xs="100"> <p>network <i class="fa fa-sitemap" aria-hidden="true"></i> {{repository.network_count}}</p> </div> <div flex="30" flex-xs="100"> <p>subscribers <i class="fa fa-eye" aria-hidden="true"></i> {{repository.subscribers_count}}</p> </div> </div> </md-card-content>  <md-card-actions layout="row" layout-align="center center"> <md-button flex="30" ng-click="showIssues =! showIssues" flex-xs="100" class="md-raised md-primary">Show Issues </md-button> <md-button flex="30" ng-click="showCharts =! showCharts" flex-xs="100" class="md-raised md-primary">Chart </md-button> </md-card-actions> </md-card> </div> <div ng-show="showIssues && issues.items.length > 0" layout="row" layout-align="center center"> <md-input-container flex="50" flex-md="100" flex-sm="100" flex-xs="100" class="md-block"> <label>Limit number of issues to show (default is 3 )</label> <input type="number" ng-model="limit"> </md-input-container> </div> <div ng-if="showIssues" layout="row" layout-align="center center"> <md-list ng-show="issues.items.length > 0" flex="50" flex-md="100" flex-sm="100" flex-xs="100"> <md-subheader class="md-no-sticky"> {{getCount("open")}} Open issues </md-subheader> <md-list-item ng-repeat="issue in issues.items  | filter: openIssues |  limitTo : limit track by $index" class="md-3-line" ng-href="{{issue.html_url}}"> <img ng-src="{{issue.user.avatar_url}}" class="md-avatar"> <div class="md-list-item-text" layout="column"> <h3>User:{{ issue.user.login }}</h3> <h4>Title:{{ issue.title }}</h4> <span>State:{{issue.state}}</span> </div> </md-list-item> <md-divider></md-divider> </md-list> <p ng-if="issues.items.length == 0"> This repository has no issues</p> </div> <div ng-if="showCharts" layout="row" layout-align="center center"> <md-content flex="50" flex-md="100" flex-sm="100" flex-xs="100"> <canvas id="line" class="chart chart-line" chart-data="data" chart-labels="labels" chart-series="series" chart-options="options" chart-dataset-override="datasetOverride"> </canvas> </md-content> </div>'),a.put("views/user.html",'<div layout="row" layout-align="center center"> <md-card flex="50" flex-md="100" flex-sm="100" flex-xs="100"> <md-card-title> <md-card-title-text> <span class="md-headline" layout="row" layout-align="center center">Find a user on Github</span> </md-card-title-text> </md-card-title> <md-card-content> <a class="md-accent">Enter a Github username below and click the button to display user info. </a> <md-input-container layout-gt-lg class="md-block"> <label> Username </label> <input ng-model="userName"> </md-input-container> </md-card-content> <md-card-actions layout="row" layout-align="end center"> <md-button class="md-accent" ng-disabled="!(userName)" ng-click="Search()">Search</md-button> <md-button class="md-accent" ng-click="clearUser()">Clear</md-button> </md-card-actions> </md-card> </div> <div ng-show="userNotFound" layout="row" layout-align="center center"> <md-content flex="50" flex-md="100" flex-sm="100" flex-xs="100" layout-padding> <h2>We couldn’t find any user matching <span ng-bind="userName | limitTo:15 "></span> <span ng-if="userName.length > 15">...</span> </h2> </md-content> </div> <div layout="row" layout-align="center center"> <md-progress-circular ng-show="loading" md-mode="indeterminate"></md-progress-circular> </div> <div ng-show="loaded" layout="row" layout-align="center center"> <md-card flex="50" flex-md="100" flex-sm="100" flex-xs="100"> <md-card-title> <md-card-title-text> <span class="md-headline" layout="row" layout-align="center center">{{user.name}}</span> </md-card-title-text> </md-card-title> <md-card-content> <md-list flex flex-md="100" flex-sm="100" flex-xs="100"> <md-list-item class="md-3-line"> <img ng-src="{{user.avatar_url}}" class="md-avatar"> <div class="md-list-item-text" layout="column"> <a ng-href="{{user.html_url}}" target="_blank">{{ user.login }}</a> <span>Followers: {{user.followers}} - Following: {{user.following}} - Repos: {{user.public_repos}}</span> </div> </md-list-item> <md-divider></md-divider> </md-list> <div layout-xs="column" layout="row"> <div flex> <p ng-hide="reposFound">No repos!</p> <div ng-show="reposFound"> <p><strong>Repos by the user:</strong></p> <section layout="row" layout-xs="column" layout-wrap> <md-button flex="30" ng-repeat="repo in repos" flex-xs="100" ng-href="{{repo.html_url}}" class="md-raised md-primary">{{repo.name}} </md-button> </section> </div> </div> </div> </md-card-content> </md-card> </div>')}]);