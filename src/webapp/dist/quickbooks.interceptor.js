'use strict';

(function () {
    'use strict';

    angular.module('exampleApp').factory('quickBooksInterceptor', quickBooksInterceptor);

    quickBooksInterceptor.$inject = ['NODE_API_BASE_URL', 'NodeSocket', 'AuthQuickbooksProvider', '$q', '$window'];

    function quickBooksInterceptor(NODE_API_BASE_URL, NodeSocket, AuthQuickbooksProvider, $q, $window) {

        var service = {
            request: request,
            response: response
        };

        return service;

        //////////////////////////

        function request(config) {
            if (!config.url.includes(NODE_API_BASE_URL)) {
                return config;
            }

            if (!NodeSocket.isConnected()) {
                return $q.reject({ code: 404, message: 'You must switch on Node Server.' });
            }

            if (!AuthQuickbooksProvider.hasAuthInfo()) {
                return $q.reject({ code: 401, message: 'Login before using api' });
            }

            config.headers = AuthQuickbooksProvider.getHeaders();

            if (!AuthQuickbooksProvider.isAvailable()) {
                config.url = NODE_API_BASE_URL + '/quickbooks/auth/requestToken';
            }

            return config;
        }

        function response(response) {
            if (!response.config.url.includes(NODE_API_BASE_URL) || AuthQuickbooksProvider.isAvailable()) {
                return response;
            }

            if (response.config.url.includes('/auth')) {
                $window.open(response.data);
                return $q.reject(response);
            }
        }
    }
})();