'use strict';

var app = angular.module('graphApp', ['ngRoute', 'AdalAngular', 'angularMoment'])
    .config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {

        $routeProvider.when("/Home", {
            controller: "homeCtrl",
            templateUrl: "/App/Views/Home.html",
        }).when("/UserData", {
            controller: "userDataCtrl",
            templateUrl: "/App/Views/UserData.html",
            requireADLogin: true,
        }).when("/Graph/:upn?", {
            controller: "graphCtrl",
            templateUrl: "/App/Views/Graph.html",
            requireADLogin: true,
        }).when("/D3", {
            controller: "myd3Ctrl",
            templateUrl: "/App/Views/D3.html",
        }).otherwise({ redirectTo: "/Home" });

        var endpoints = {
            // Map the location of a request to an API to a the identifier of the associated resource
            'https://graph.microsoft.com': 'https://graph.microsoft.com'
        };
        adalProvider.init(
            {
                instance: 'https://login.microsoftonline.com/',
                tenant: 'perkesdemo.onmicrosoft.com',
                clientId: '223b5936-e31e-4036-a813-af8e976e7e87',
                extraQueryParameter: 'nux=1',
                endpoints: endpoints,
            },
            $httpProvider
            );

    }]);

app.factory('graphHttpInterceptor', ['$q', '$rootScope', '$injector',
    function ($q, $rootScope, $injector) {
        return {
            'response': function (response) {
                if (response.config.url.search(/graph\.microsoft\.com/) !== -1) {
                    if ($rootScope.requestLog == null) $rootScope.requestLog = [];
                    response.completedOn = new Date();
                    $rootScope.requestLog.unshift(response);
                }
                return response;
            },
            'responseError': function (response) {
                if (response.config.url.search(/graph\.microsoft\.com/) !== -1) {
                    if ($rootScope.requestLog == null) $rootScope.requestLog = [];
                    response.completedOn = new Date();
                    $rootScope.requestLog.unshift(response);
                }
                return response;
            }
        }
    }
]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('graphHttpInterceptor');
});
