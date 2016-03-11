var app = angular.module('consentApp', ['ngRoute', 'AdalAngular']);

app.constant('azureADConfig', azureADConfig);

app
    .config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', 'azureADConfig', 
    function ($routeProvider, $httpProvider, adalProvider, azureADConfig) {

        $routeProvider.when("/consent", {
            controller: "consentCtrl",
            templateUrl: "/App/Views/consent.html",
            requireADLogin: true,
        })
        .when("/home", {
            controller: "consentHomeCtrl",
            templateUrl: "/App/Views/consentHome.html"
        })    
        .otherwise({ redirectTo: "/home" });

        adalProvider.init(
            {
                instance: 'https://login.microsoftonline.com/',
                clientId: azureADConfig.clientId,
                extraQueryParameter: 'prompt=consent',
                endpoints: azureADConfig.endpoints,
            },
            $httpProvider
            );
    }]);
app.controller('consentHomeCtrl', ['$scope', 'adalAuthenticationService','$location', function ($scope, adalService, $location) {
    $scope.consent = function () {
        adalService.logOut();
        //adalService.login();
        $location.path("/consent");
    };
}]);

app.controller('consentCtrl', ['$scope', 'adalAuthenticationService','$location', function ($scope, adalService, $location) {
    
}]);