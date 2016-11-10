(function() {
    'use strict'

    angular
        .module('exampleApp')
        .constant('NODE_API_BASE_URL', 'http://datatool.dev:8080')
        .constant('NODE_SOCKET_BASE_URL', 'http://datatool.dev:8081')
})();
