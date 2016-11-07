(function() {
    'use strict';

    angular
        .module('exampleApp')
        .factory('quickBooksInterceptor', quickBooksInterceptor);

    quickBooksInterceptor.$inject = ['NODE_API_BASE_URL', 'NodeSocket', 'AuthQuickbooksProvider', '$q', '$window'];

    function quickBooksInterceptor (NODE_API_BASE_URL, NodeSocket, AuthQuickbooksProvider, $q, $window) {

        const service = {
            request: request,
            response: response
        };

        return service;

        //////////////////////////

        function request (config) {
            if ( !config.url.includes(NODE_API_BASE_URL) ){
                return config;
            }

            if (!NodeSocket.isConnected()) {
                let response = {
                    status: 404,
                    data: 'You must switch on Node Server.',
                    config: {url: config.url}
                };

                return $q.reject(response)
            }

            if ( !AuthQuickbooksProvider.hasAuthInfo() ) {
                let response = {
                    status: 400,
                    data: 'Set credentials before using api.',
                    config: {url: config.url}
                };
                return $q.reject(response)
            }

            config.headers = AuthQuickbooksProvider.getHeaders()

            if ( !AuthQuickbooksProvider.isAvailable() ) {
                config.url = NODE_API_BASE_URL+'/quickbooks/auth/requestToken'
            }

            return config;
        }

        function response (response) {

            if (!response.config){
                return response
            }

            if ( !response.config.url.includes(NODE_API_BASE_URL) || AuthQuickbooksProvider.isAvailable()) {
                return response
            }

            if ( response.config.url.includes('/auth') ) {
                $window.open(response.data)
                return $q.reject(response)
            }
        }
    }
})();
