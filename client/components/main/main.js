(function () {
    'use strict';

    angular.module('devils-advocate.components.main', [
        'ngRoute',
        'devils-advocate.common.services.devils-advocate'
    ])
        .config(config)
        .controller('MainController', MainController);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'components/main/main.html',
                controller: 'MainController'
            });
    }

    MainController.$inject = ['$scope', '$mdToast', 'DevilsAdvocateService'];

    function MainController($scope, $mdToast, DevilsAdvocateService) {
        DevilsAdvocateService.getGroup()
            .then(function (result) {
                $scope.group = result.data;
            });

        $scope.toggleEmail = function () {
            function successHandler(data) {
                console.log(data);

                var message = ($scope.group.sendEmail) ? 'Each week a random team member will be assigned as devil\'s advocate' : 'Your team will no longer be assigned a weekly devil\'s advocate';

                $mdToast.show(
                    $mdToast.simple()
                        .textContent(message)
                        .hideDelay(5000)
                );
            }

            function errorHandler(error) {
                console.log(error);
            }

            DevilsAdvocateService.toggleEmail($scope.group.sendEmail)
                .then(successHandler, errorHandler);
        };
    }
}());
