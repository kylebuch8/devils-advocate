(function () {
    'use strict';

    angular.module('devils-advocate.common.services.devils-advocate', [])
        .factory('DevilsAdvocateService', DevilsAdvocateService);

    DevilsAdvocateService.$inject = ['$http'];

    function DevilsAdvocateService($http) {
        var service = {
            login: login,
            getGroup: getGroup,
            toggleEmail: toggleEmail
        };

        function login(user) {
            return $http.post('/login', user);
        }

        function getGroup() {
            return $http.get('/group');
        }

        function toggleEmail(sendEmail) {
            return $http.post('/group/1/toggle-email', {
                sendEmail: sendEmail
            });
        }

        return service;
    }
}());
