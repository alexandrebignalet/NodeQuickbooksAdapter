'use strict';

(function () {
    'use strict';

    var connectionAccounting = {
        template: '<div>' + '<span ng-if="vm.connected">Node ON</span>' + '<span ng-if="!vm.connected">Node OFF</span>' + '<span ng-if="vm.available">Quickbooks ON</span>' + '<span ng-if="!vm.available">Quickbooks OFF</span>',
        controller: ConnectionAccountingController,
        controllerAs: 'vm'
    };

    angular.module('exampleApp').component('connectionAccounting', connectionAccounting);

    ConnectionAccountingController.$inject = ['$scope', 'AuthQuickbooksProvider', 'NodeSocket'];

    function ConnectionAccountingController($scope, AuthQuickbooksProvider, NodeSocket) {
        var vm = this;

        vm.connected = false;

        $scope.$watch(function () {
            return NodeSocket.isConnected();
        }, function (value) {
            vm.connected = value;
        });

        $scope.$watch(function () {
            return AuthQuickbooksProvider.isAvailable();
        }, function (value) {
            vm.available = value;
        });
    }
})();