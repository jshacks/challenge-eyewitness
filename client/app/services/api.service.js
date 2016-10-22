(function () {
    'use strict';

    angular
        .module('eyewitness')
        .factory('apiService', ['$http', apiService]);

    function apiService ($http) {
        var HOST = 'http://localhost/';

        function getAllEntries (param, success, error) {

            $http.get(HOST + 'entries')
                .then(function (entries) {
                    success(entries);
                }, function (errorMsg) {
                    error(errorMsg);
                });
        }

        function getEntryById (entryId, success, error) {
            $http.get(HOST + 'entries/' + entryId)
                .then(function (entries) {
                    success(entries);
                }, function (errorMsg) {
                    error(errorMsg);
                });
        }

        return {
            getAllEntries: getAllEntries,
            getEntryById: getEntryById
        };

    }

}());
