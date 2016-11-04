'use strict';

(function () {
    'use strict';

    angular.module('exampleApp').factory('EntityFactory', EntityFactory);

    EntityFactory.$inject = ['$resource', 'NODE_API_BASE_URL'];

    /* @ngInject */
    function EntityFactory($resource, NODE_API_BASE_URL) {

        var resourceUrl = NODE_API_BASE_URL + '/quickbooks/controllers/:entityAlias/:id';

        return $resource(resourceUrl, { entityAlias: '@entityAlias', id: '@id' }, {
            'update': { method: 'PATCH' }
        });
    }
})();