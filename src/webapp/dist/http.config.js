'use strict';

(function () {
    'use strict';

    angular.module('exampleApp').config(httpConfig);

    httpConfig.$inject = ['$httpProvider'];

    function httpConfig($httpProvider) {
        $httpProvider.interceptors.push('quickBooksInterceptor');
    }
})();