(function () {
    'use strict';

    angular
        .module('eyewitness')
        .controller('MainCtrl', ['Modals', MainCtrl]);

    function MainCtrl (Modals) {
        var self = this;


        self.openModalHandler = function openModalHandler () {
            Modals.openDetaliedModal('qwerty');
        };
    }

}());
