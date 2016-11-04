'use strict';

(function () {
    'use strict';

    angular.module('exampleApp').factory('EntityFactory', EntityFactory);

    EntityFactory.$inject = ['$http', '$q', 'NODE_API_BASE_URL'];

    /* @ngInject */
    function EntityFactory($http, $q, NODE_API_BASE_URL) {

        var service = {
            get: get
        };

        return service;

        ////////////////

        function get(entityAlias, id) {

            return $http({
                method: 'GET',
                url: NODE_API_BASE_URL + '/quickbooks/controllers/' + entityAlias + '/' + id
            }).then(function (response) {
                console.log('Then http get : ', response);
                return response.data;
            }).catch(function (error) {
                if (error.code === 401 || error.data && error.data.code === 404 || error.data && error.data.code === 400) {
                    console.log(error);
                    return $q.reject();
                }
                if (error.config && error.config.url.includes("/auth")) {
                    return $q.reject();
                }
                console.log(error);
            });
        }
    }
})();