'use strict';

(function () {
    'use strict';

    angular.module('exampleApp').factory('NodeConnection', NodeConnection);

    NodeConnection.$inject = ['socket'];

    /* @ngInject */
    function NodeConnection(socket) {
        var service = {
            on: on,
            emit: emit
        };
        return service;

        ////////////////

        function init() {}
    }
})();