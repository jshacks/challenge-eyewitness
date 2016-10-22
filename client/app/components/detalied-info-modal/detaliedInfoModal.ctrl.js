(function () {
    'use strict';

    angular
        .module('eyewitness')
        .controller('DetaliedInfoModal', ['data', DetaliedInfoModal]);

    function DetaliedInfoModal (data) {
        var self = this;

        self.da = 'da';

        console.log(data);
    }

}());
