(function () {
    'use strict';

    angular
        .module('eyewitness')
        .config(routes);

    function routes ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: '/app/components/main/main.tpl',
                controller: 'mainCtrl',
                controllerAs: 'main'
            });

        $urlRouterProvider.otherwise('/login');
    }

}());
