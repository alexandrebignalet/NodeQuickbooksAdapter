'use strict';

(function () {
    'use strict';

    angular.module('exampleApp').controller('EntityController', EntityController);

    EntityController.$inject = ['EntityFactory', 'AuthQuickbooksProvider', '$q'];

    /* @ngInject */
    function EntityController(EntityFactory, AuthQuickbooksProvider, $q) {
        var vm = this;
        vm.title = 'EntityController';

        vm.id = 59;
        vm.entityAlias = "Customer";
        vm.authInfo = {
            consumerKey: 'qyprdZBVlz5PeYSzvBMt0ZK4E27pbQ',
            consumerSecret: 'eSdp2o7thAlbiQCaf0IEYD8lqNUW1pqpZKPbosaC'
        };

        vm.entity = null;
        vm.load = load;
        vm.saveCredentials = saveCredentials;
        vm.queryInvoicesByDates = queryInvoicesByDates;

        ////////////////

        function load(entityAlias, id) {
            EntityFactory.get({ entityAlias: entityAlias, id: id }).$promise.then(function (entity) {
                vm.entity = entity;
            }).catch(function (e) {
                vm.entity = null;
            });
        }

        function queryInvoicesByDates(entityAlias) {
            EntityFactory.get({
                entityAlias: entityAlias,
                "1": { "field": "TxnDate", "value": "2016-10-01", "operator": ">" },
                "2": { "field": "TxnDate", "value": "2016-10-31", "operator": "<" },
                "3": { "field": "limit", "value": "5" }
            }).$promise.then(function (entities) {
                vm.entity = entities;
            }).catch(function () {
                vm.entity = null;
            });
        }

        function saveCredentials(_ref) {
            var consumerKey = _ref.consumerKey,
                consumerSecret = _ref.consumerSecret;

            AuthQuickbooksProvider.setAuthInfo({ consumerKey: consumerKey, consumerSecret: consumerSecret });
        }
    }
})();