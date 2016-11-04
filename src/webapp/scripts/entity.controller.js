(function () {
    'use strict';

    angular
        .module('exampleApp')
        .controller('EntityController', EntityController)

    EntityController.$inject = ['EntityFactory', 'AuthQuickbooksProvider', '$q']

    /* @ngInject */
    function EntityController(EntityFactory, AuthQuickbooksProvider, $q) {
        var vm = this
        vm.title = 'EntityController'

        vm.id = 59
        vm.entityAlias = "Customer"
        vm.authInfo = {
            consumerKey: 'qyprdZBVlz5PeYSzvBMt0ZK4E27pbQ',
            consumerSecret: 'eSdp2o7thAlbiQCaf0IEYD8lqNUW1pqpZKPbosaC'
        }

        vm.entity = null
        vm.load = load
        vm.saveCredentials = saveCredentials
        vm.queryInvoicesByDates = queryInvoicesByDates

        ////////////////

        function load(entityAlias, id) {
            EntityFactory.get({entityAlias, id}).$promise
                .then((entity) => {
                    vm.entity = entity
                }).catch( (e) => {
                    vm.entity = null
            })
        }

        function queryInvoicesByDates (entityAlias) {
            EntityFactory.get({
                entityAlias,
                "1": {"field": "TxnDate", "value": "2016-10-01", "operator": ">"},
                "2": {"field": "TxnDate", "value": "2016-10-31", "operator": "<"},
                "3": {"field": "limit", "value": "5"}
            }).$promise
                .then( (entities) => {
                    vm.entity = entities
                })
                .catch( () => {
                    vm.entity = null
                })
        }

        function saveCredentials ({ consumerKey, consumerSecret }) {
            AuthQuickbooksProvider.setAuthInfo({ consumerKey, consumerSecret })
        }
    }

})();

