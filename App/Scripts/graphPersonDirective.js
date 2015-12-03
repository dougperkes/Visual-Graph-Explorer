'use strict';
angular.module('graphApp')
        .directive('graphPerson', ['$http', 'adalAuthenticationService', function ($http, adalService) {

                return {
                        restrict: 'E',
                        scope: {
                                personData: '=person'
                        },
                        link: function ($scope, element, attrs, ctrl) {
                                $scope.$watch('personData', function (newValue) {
                                        if ($scope.personData) {
                                                $scope.upn = $scope.personData.userPrincipalName;
                                        }
                                });

                                $scope.showManager = function () {
                                        $scope.loadingMessage = "Loading...";
                                        var url = "https://graph.microsoft.com/v1.0/users/" + $scope.upn + "/manager";

                                        $http.get(url)
                                                .then(function successCallback(response) {
                                                        $scope.personData.manager = response.data;
                                                        $scope.loadingMessage = "";
                                                }, function errorCallback(response) {
                                                        $scope.error = JSON.stringify(response);
                                                        $scope.loadingMessage = "";
                                                });
                                };

                                $scope.showDirectReports = function () {
                                        $scope.loadingMessage = "Loading...";
                                        var url = "https://graph.microsoft.com/v1.0/users/" + $scope.upn + "/directReports";

                                        $http.get(url)
                                                .then(function successCallback(response) {
                                                        $scope.directReports = response.data.value;
                                                        $scope.loadingMessage = "";
                                                }, function errorCallback(response) {
                                                        $scope.error = JSON.stringify(response);
                                                        $scope.loadingMessage = "";
                                                });
                                };

                                $scope.showMessages = function () {
                                        $scope.loadingMessage = "Loading...";
                                        var url = "https://graph.microsoft.com/v1.0/users/" + $scope.upn + "/messages"

                                        $http.get(url)
                                                .then(function successCallback(response) {
                                                        $scope.messages = response.data.value;
                                                        $scope.loadingMessage = "";
                                                }, function errorCallback(response) {
                                                        $scope.error = JSON.stringify(response);
                                                        $scope.loadingMessage = "";
                                                });
                                };

                                $scope.showDrive = function () {
                                        $scope.loadingMessage = "Loading...";
                                        var url = "https://graph.microsoft.com/v1.0/users/" + $scope.upn + "/drive/root/children";

                                        $http.get(url)
                                                .then(function successCallback(response) {
                                                        $scope.drive = response.data.value;
                                                        $scope.loadingMessage = "";
                                                }, function errorCallback(response) {
                                                        $scope.error = JSON.stringify(response);
                                                        $scope.loadingMessage = "";
                                                });
                                };

                                $scope.showContacts = function () {
                                        $scope.loadingMessage = "Loading...";
                                        var url = "https://graph.microsoft.com/v1.0/users/" + $scope.upn + "/contacts?$top=50";

                                        $http.get(url)
                                                .then(function successCallback(response) {
                                                        $scope.contacts = response.data.value;
                                                        $scope.loadingMessage = "";
                                                }, function errorCallback(response) {
                                                        $scope.error = JSON.stringify(response);
                                                        $scope.loadingMessage = "";
                                                });
                                };

                                $scope.showEvents = function () {
                                        $scope.loadingMessage = "Loading...";
                                        var url = "https://graph.microsoft.com/v1.0/users/" + $scope.upn + "/events";

                                        $http.get(url)
                                                .then(function successCallback(response) {
                                                        $scope.events = response.data.value;
                                                        $scope.loadingMessage = "";
                                                }, function errorCallback(response) {
                                                        $scope.error = JSON.stringify(response);
                                                        $scope.loadingMessage = "";
                                                });
                                };

                                $scope.showGroups = function () {
                                        $scope.loadingMessage = "Loading...";
                                        var url = "https://graph.microsoft.com/v1.0/users/" + $scope.upn + "/memberOf";

                                        $http.get(url)
                                                .then(function successCallback(response) {
                                                        $scope.groups = response.data.value;
                                                        $scope.loadingMessage = "";
                                                }, function errorCallback(response) {
                                                        $scope.error = JSON.stringify(response);
                                                        $scope.loadingMessage = "";
                                                });
                                };

                                $scope.showGroupMembers = function (group) {
                                        var url = "https://graph.microsoft.com/v1.0/groups/" + group.id + "/members";
                                        $http.get(url)
                                                .then(function successCallback(response) {
                                                        group.members = response.data.value;
                                                }, function errorCallback(response) {
                                                        $scope.error = JSON.stringify(response);
                                                        $scope.loadingMessage = "";
                                                })
                                }

                        },
                        templateUrl: 'App/Views/graph-person.html',
                        controller: function ($scope, $http, $route) {


                        }
                };

        }]);