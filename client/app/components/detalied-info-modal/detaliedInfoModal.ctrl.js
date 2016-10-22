(function () {
    'use strict';

    angular
        .module('eyewitness')
        .controller('DetaliedInfoModal', ['apiService', '$mdDialog', 'data', DetaliedInfoModal]);

    function DetaliedInfoModal (apiService, $mdDialog, data) {
        var self = this;

        self.entry = {};

        self.rate = {
            value: 3.5
        };

        function init () {
            getEntryById();
        }

        init();

        function getEntryById () {
            apiService.getEntryById(data.entryId, function success (entry) {
                self.entry = entry;
            }, function error (msg) {
                console.log(msg);
            })
        }



        self.closeHandler = function close () {
            $mdDialog.cancel();
        }
    }

}());
