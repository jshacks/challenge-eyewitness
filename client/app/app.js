angular.module('eyewitness', [
    'ui.router',
    'angularModalService',
    'ngMap',
    'ngMaterial',
    //'md.data.table',
    'mega.rating',
    'ngGeolocation',
    //'auth0.auth0',
    'angular-storage',
    'angular-jwt',
    'auth0.lock',
    'angularUtils.directives.dirPagination',
    'ngResource',
    'lbServices'
])

.service('authService', authService)

.config(['lockProvider', 'LoopBackResourceProvider',
    function(lockProvider, LoopBackResourceProvider) {

    LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    LoopBackResourceProvider.setUrlBase('http://172.20.10.8:3000/api')
    lockProvider.init({
        clientID: 'urANnKd7ms9SHtPm1oh4xgtUbF1AiTpJ',
        domain: 'maximblack.eu.auth0.com',
    });


}]).run(['$rootScope', 'authService', 'lock', 'authManager', function run($rootScope, authService, lock, authManager) {
        // Put the authService on $rootScope so its methods
        // can be accessed from the nav bar
        $rootScope.authService = authService;

        // Register the authentication listener that is
        // set up in auth.service.js
        authService.registerAuthenticationListener();

        // the user's authentication state when the page is
        // refreshed and maintain authentication
        authManager.checkAuthOnRefresh();

        // Register the synchronous hash parser
        lock.interceptHash();

    }
]);

authService.$inject = ['$rootScope', 'lock', 'authManager', 'jwtHelper', '$q'];

function authService($rootScope, lock, authManager, jwtHelper, $q) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
    var deferredProfile = $q.defer();

    if (userProfile) {
        deferredProfile.resolve(userProfile);
    } else {
        login();
        deferredProfile.reject();
    }

    function login() {
        lock.show();
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
        deferredProfile = $q.defer();
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        authManager.unauthenticate();
        userProfile = null;
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
        lock.on('authenticated', function (authResult) {
            localStorage.setItem('id_token', authResult.idToken);
            authManager.authenticate();

            lock.getProfile(authResult.idToken, function (error, profile) {
                if (error) {
                    return console.log(error);
                }

                localStorage.setItem('profile', JSON.stringify(profile));
                deferredProfile.resolve(profile);
            });

        });
    }

    function getProfileDeferred() {
        return deferredProfile.promise;
    }

    function checkAuthOnRefresh() {
        var token = localStorage.getItem('id_token');
        if (token) {
            if (!jwtHelper.isTokenExpired(token)) {
                if (!$rootScope.isAuthenticated) {
                    authManager.authenticate();
                }
            }
        }
    }

    return {
        login: login,
        logout: logout,
        registerAuthenticationListener: registerAuthenticationListener,
        checkAuthOnRefresh: checkAuthOnRefresh,
        getProfileDeferred: getProfileDeferred
    }

}
