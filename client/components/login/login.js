(function () {
    'use strict';

    angular.module('devils-advocate.components.login', [
        'ngRoute',
        'devils-advocate.common.services.devils-advocate'
    ])
        .config(config)
        .controller('LoginController', LoginController);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'components/login/login.html',
                controller: 'LoginController'
            });
    }

    LoginController.$inject = ['$scope', '$location', '$mdToast', 'DevilsAdvocateService'];

    function LoginController($scope, $location, $mdToast, DevilsAdvocateService) {
        $scope.login = function () {
            function successHandler(data) {
                $location.path('/');
            }

            function errorHandler(error) {
                var message = 'There was a problem logging in';

                if (error.status === 401) {
                    message = 'Invalid username or password';
                }

                $mdToast.show(
                    $mdToast.simple()
                        .textContent(message)
                        .hideDelay(3000)
                );
            }

            DevilsAdvocateService.login($scope.user)
                .then(successHandler, errorHandler);
        };
    }
}());
