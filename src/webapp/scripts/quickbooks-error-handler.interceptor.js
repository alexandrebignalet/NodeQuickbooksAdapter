(function() {
    'use strict';

    angular
        .module('exampleApp')
        .factory('quickBooksErrorHandlerInterceptor', quickBooksErrorHandlerInterceptor);

    quickBooksErrorHandlerInterceptor.$inject = ['NODE_API_BASE_URL', '$q'];

    function quickBooksErrorHandlerInterceptor (NODE_API_BASE_URL, $q) {

        const service = {
            responseError: responseError
        };

        return service;

        //////////////////////////

        function responseError (response) {

            if ( !response.config.url.includes(NODE_API_BASE_URL) ) {
                return response
            }

            switch (response.status) {
                case 401:
                    console.log('401 error', response)
                    break;
                case 400:
                    console.log('400 error', response)
                    break;
                default:
                    console.log('400 error', response.status, response)
                    break;
            }

            return $q.reject(response)
        }
    }
})();
