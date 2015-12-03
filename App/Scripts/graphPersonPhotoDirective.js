'use strict';
angular.module('graphApp')
        .directive('graphPersonPhoto', ['$http', 'adalAuthenticationService', function ($http, adalService) {
                var Cache = {
                        stack: {}, //Cache stack
                        load: function (id) { //Load cache if found
                                return (typeof (this.stack[id]) != 'undefined') ? this.stack[id] : false;
                        },
                        save: function (data, id) { //Cache data with unique id
                                this.stack[id] = data;
                        },
                        remove: function (id) {//Remove cache for identifier
                                if (typeof (this.stack[id]) != 'undefined')
                                        delete this.stack[id];
                        }
                };
                return {
                        restrict: 'E',
                        scope: {
                                personId: '=person'
                        },
                        link: function ($scope, element, attrs, ctrl) {
                                //console.log("Directive was linked");
                                $scope.myPhoto = "Content/Man_Silhouette2.jpg";
                                $scope.$watch('personId', function (newValue) {
                                        if ($scope.personId) {
                                                var content = Cache.load($scope.personId);
                                                if (content == false) {
                                                        //console.log("Getting photo for personId = " + $scope.personId);
                                                        //$scope.personId = $scope.personData.userPrincipalName;
                                                        var url = "https://graph.microsoft.com/v1.0/users/" + $scope.personId + "/photo/$value";

                                                        $http({
                                                                url: url,
                                                                method: 'GET',
                                                                responseType: 'blob'
                                                        }).then(function successCallback(response) {
                                                                var url = window.URL || window.webkitURL;
                                                                var blobUrl = url.createObjectURL(response.data);
                                                                $scope.myPhoto = blobUrl;
                                                                Cache.save(blobUrl, $scope.personId);
                                                        }, function errorCallback(response) {
                                                                $scope.error = JSON.stringify(response);
                                                                //let's still cache a default image
                                                                Cache.save($scope.myPhoto, $scope.personId);
                                                        });
                                                } else {
                                                        //console.log('Loading photo from cache');
                                                        $scope.myPhoto = content;
                                                }
                                        }
                                });

                        },
                        templateUrl: 'App/Views/graph-person-photo.html',

                };

        }]);