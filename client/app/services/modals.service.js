(function () {
    'use strict';

    angular
        .module('eyewitness')
        .factory('Modals', ['$mdDialog', Modals]);

    function Modals ($mdDialog) {

        function openDetaliedModal (ev, data) {

            return $mdDialog.show({
                templateUrl: "app/components/detalied-info-modal/detalied-info-modal.tpl.html",
                controller: "DetaliedInfoModal",
                controllerAs: 'detail',
                locals: {
                    data: data
                },
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
            });

        }


        return {
            openDetaliedModal: openDetaliedModal
        };

    }

}());
