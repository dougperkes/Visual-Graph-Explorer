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
                                
                                $scope.showPeople = function() {
                                        $scope.loadingMessage = "Loading...";
                                        var url = "https://graph.microsoft.com/beta/users/" + $scope.upn + "/people";

                                        $http.get(url)
                                                .then(function successCallback(response) {
                                                        $scope.people = response.data.value;
                                                        $scope.loadingMessage = "";
                                                }, function errorCallback(response) {
                                                        $scope.error = JSON.stringify(response);
                                                        $scope.loadingMessage = "";
                                                });
                                }

                                $scope.showTrendingAround = function() {
                                        $scope.loadingMessage = "Loading...";
                                        var url = "https://graph.microsoft.com/beta/users/" + $scope.upn + "/trendingAround";

                                        $http.get(url)
                                                .then(function successCallback(response) {
                                                        $scope.trendingAround = response.data.value;
                                                        $scope.loadingMessage = "";
                                                }, function errorCallback(response) {
                                                        $scope.error = JSON.stringify(response);
                                                        $scope.loadingMessage = "";
                                                });
                                }

                                $scope.createFolder = function () {
                                        var folderName = $scope.newFolderName;
                                        if (folderName) {
                                                var url = "https://graph.microsoft.com/v1.0/users/" + $scope.upn + "/drive/root/children";
                                                var data = { "name": folderName, "folder": {} };
                                                $http.post(url, data)
                                                        .then(function successCallback(response) {
                                                                //let's just refresh the drive data
                                                                $scope.showDrive();
                                                                $scope.newFolderName = "";
                                                        }, function errorCallback(response) {
                                                                $scope.error = JSON.stringify(response);
                                                                $scope.loadingMessage = "";
                                                        })
                                        }
                                }

                                $scope.createFile = function () {
                                        var f = document.getElementById("inputFile").files[0];
                                        var r = new FileReader();
                                        r.onloadend = function (e) {
                                                var data = e.target.result;
                                                var url = "https://graph.microsoft.com/v1.0/users/" + $scope.upn + "/drive/root/children/" + f.name + "/content";
                                                $http.put(url, data)
                                                        .then(function successCallback(response) {
                                                                $scope.drive.push(response.data);
                                                                document.getElementById("inputFile").value = "";
                                                        }, function errorCallback(response) {
                                                                $scope.error = JSON.stringify(response);
                                                                $scope.loadingMessage = "";
                                                        })
                                        }
                                        r.readAsBinaryString(f);
                                }

                                $scope.deleteOneDriveItem = function (item) {
                                        var url = "https://graph.microsoft.com/v1.0/users/" + $scope.upn + "/drive/items/" + item.id
                                        $http.delete(url)
                                                .then(function successCallback(response) {
                                                        //$scope.showDrive();
                                                        // Find and remove item from an array
                                                        var i = $scope.drive.indexOf(item);
                                                        if (i != -1) {
                                                                $scope.drive.splice(i, 1);
                                                        }
                                                }, function errorCallback(response) {
                                                        $scope.error = JSON.stringify(response);
                                                        $scope.loadingMessage = ""
                                                })
                                }

                                $scope.createSharingLink = function (driveItem) {
                                        var url = "https://graph.microsoft.com/v1.0/users/" + $scope.upn + "/drive/items/" + driveItem.id +
                                                "/microsoft.graph.createLink";
                                        var data = { "type": "edit", "scope": "organization" };
                                        $http.post(url, data)
                                                .then(function successCallback(response) {
                                                        var linkData = response.data;
                                                        driveItem.sharingLink = linkData.SharingLink;
                                                }, function errorCallback(response) {

                                                });
                                }

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

                                $scope.sendSampleMail = function () {
                                        $scope.sampleMailSent = false;
                                        var url = "https://graph.microsoft.com/v1.0/users/" + $scope.upn + "/microsoft.graph.sendmail"
                                        var data = {
                                                "Message": {
                                                        "Subject": "Visual Graph Explorer sample mail",
                                                        "Body": {
                                                                "ContentType": "Html",
                                                                "Content": "<html><body>Sample mail from <b>Visual Graph Explorer</b></body></html>"
                                                        },
                                                        "ToRecipients": [
                                                                {
                                                                        "EmailAddress": {
                                                                                "Name": $scope.sampleEmailAddress,
                                                                                "Address": $scope.sampleEmailAddress
                                                                        }
                                                                }
                                                        ]
                                                },
                                                "SaveToSentItems": true
                                        };
                                        $http.post(url, data)
                                                .then(function successCallback(response) {
                                                        $scope.sampleMailSent = true;
                                                }, function errorCallback(response) {
                                                        $scope.sampleMailSent = false;
                                                })

                                }

                        },
                        templateUrl: 'App/Views/graph-person.html?v2.5',
                        controller: function ($scope, $http, $route) {


                        }
                };

        }]);