'use strict';
angular.module('graphApp')
.controller('homeCtrl', ['$scope', 'adalAuthenticationService','$location', function ($scope, adalService, $location) {
    $scope.login = function () {
        adalService.login();
    };
    $scope.logout = function () {
        adalService.logOut();
    };
    $scope.isActive = function (viewLocation) {        
        return viewLocation === $location.path();
    };
}])
.controller('myd3Ctrl', ['$scope', 'adalAuthenticationService','$location', function ($scope, adalService, $location) {
    
}]);