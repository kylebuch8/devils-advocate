(function () {
    'use strict';

    angular.module('devils-advocate', [
        'ngMaterial',
        'ngAnimate',
        'ngCookies',
        'devils-advocate.components.login',
        'devils-advocate.components.main'
    ])
        .run(run)
        .config(config);

    run.$inject = ['$cookies', '$location'];

    function run($cookies, $location) {
        if (!$cookies.get('data')) {
            $location.path('/login');
        }
    }

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
    }
}());
