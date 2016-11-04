(function () {
    'use strict';

    angular
        .module('exampleApp')
        .controller('EntityController', EntityController)

    EntityController.$inject = ['EntityFactory', 'AuthQuickbooksProvider']

    /* @ngInject */
    function EntityController(EntityFactory, AuthQuickbooksProvider) {
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

        ////////////////

        function load(entityAlias, id) {
            EntityFactory.get(entityAlias, id)
                .then((entity) => {
                    vm.entity = entity
                }).catch( (err) => {
                console.log(err)
                vm.entity = null
            })
        }

        function saveCredentials ({ consumerKey, consumerSecret }) {
            AuthQuickbooksProvider.setAuthInfo({ consumerKey, consumerSecret })
        }
    }

})();

