(function () {
    'use strict';

    angular
        .module('eyewitness')
        .config(routes);

    function routes ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: '/app/components/main/main.tpl.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            });

        $urlRouterProvider.otherwise('/login');
    }

}());
