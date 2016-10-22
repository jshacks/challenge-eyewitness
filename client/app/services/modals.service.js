(function () {
    'use strict';

    angular
        .module('eyewitness')
        .factory('Modals', ['ModalService', Modals]);

    function Modals (ModalService) {

        function openDetaliedModal (data) {

            return ModalService.showModal({
                templateUrl: "app/components/detalied-info-modal/detalied-info-modal.tpl.html",
                controller: "DetaliedInfoModal",
                controllerAs: 'detail',
                inputs: {
                    data: data
                }
            });

        }


        return {
            openDetaliedModal: openDetaliedModal
        };

    }

}());
