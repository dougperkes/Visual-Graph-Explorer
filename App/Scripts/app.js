'use strict';

var app = angular.module('graphApp', ['ngRoute', 'AdalAngular', 'angularMoment']);


app.constant('azureADConfig', azureADConfig);

app
    .config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', 'azureADConfig', 
    function ($routeProvider, $httpProvider, adalProvider, azureADConfig) {

        $routeProvider.when("/Home", {
            controller: "homeCtrl",
            templateUrl: "/App/Views/Home.html",
        })
        
        .when("/UserData", {
            controller: "userDataCtrl",
            templateUrl: "/App/Views/UserData.html",
            requireADLogin: true,
        })
        
        .when("/Graph/:upn?", {
            controller: "graphCtrl",
            templateUrl: "/App/Views/Graph.html",
            requireADLogin: true,
        })
        
        .when("/D3", {
            controller: "myd3Ctrl",
            templateUrl: "/App/Views/D3.html",
        })
        
        .otherwise({ redirectTo: "/Home" });

        adalProvider.init(
            {
                instance: 'https://login.microsoftonline.com/',
                clientId: azureADConfig.clientId,
                extraQueryParameter: 'nux=1',
                endpoints: azureADConfig.endpoints,
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
