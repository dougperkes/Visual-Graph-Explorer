'use strict';
angular.module('graphApp')
    .controller('graphCtrl', ['$scope', '$http', '$location', '$route', '$routeParams', 'adalAuthenticationService', function ($scope, $http, $location, $route, $routeParams, adalService) {
        $scope.error = "";
        $scope.loadingMessage = "Loading...";
        $scope.upn = $routeParams.upn;
        $scope.$watch('upn', function (newUpn, oldUpn) {
            if (newUpn === oldUpn) return;
            
            if ($scope.upn) {
                $route.updateParams({ upn: $scope.upn })
                $scope.populate();
            }
        });


        $scope.populate = function () {
            if (!$scope.upn) {
                //get the user data for the default user
                $http.get("https://graph.microsoft.com/v1.0/me")
                    .then(function successCallback(response) {
                        $scope.upn = response.data.userPrincipalName;
                    }, function errorCallback(response) {
                        $scope.error = JSON.stringify(response);
                    });
            } else {
                var url = "https://graph.microsoft.com/v1.0/users/" + $scope.upn;
                $http.get(url)
                    .then(function successCallback(response) {
                        $scope.userData = response.data;
                        $scope.loadingMessage = "";
                    }, function errorCallback(response) {
                        $scope.error = JSON.stringify(response);
                        $scope.loadingMessage = "";
                    });
            }
        };
    }]);