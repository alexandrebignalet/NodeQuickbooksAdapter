'use strict';

(function () {
    'use strict';

    angular.module('exampleApp').factory('NodeSocket', NodeSocket);

    NodeSocket.$inject = ['$rootScope', 'NODE_SOCKET_BASE_URL', 'AuthQuickbooksProvider'];

    /* @ngInject */
    function NodeSocket($rootScope, NODE_SOCKET_BASE_URL, AuthQuickbooksProvider) {
        var connected = false;

        var _socket = io.connect(NODE_SOCKET_BASE_URL, {
            'reconnection': true,
            'reconnectionDelay': 1000,
            'reconnectionDelayMax': 5000,
            'reconnectionAttempts': 4
        });

        var service = {
            isConnected: isConnected,
            on: on,
            emit: emit
        };

        on('connect', function () {
            connected = true;
            console.log('connected');
        });

        on('connect_error', function () {
            connected = false;
            AuthQuickbooksProvider.setAvailable(false);
        });

        on('quickbooks_authentication_success', function () {
            AuthQuickbooksProvider.setAvailable(true);
        });

        on('quickbooks_available', function () {
            console.log('1');
            AuthQuickbooksProvider.setAvailable(true);
        });

        on('quickbooks_not_available', function () {
            console.log('2');
            AuthQuickbooksProvider.setAvailable(false);
        });

        return service;

        ////////////////

        function isConnected() {
            return connected;
        }

        function on(eventName, callback) {
            var _arguments = arguments;

            _socket.on(eventName, function () {
                var args = _arguments;
                $rootScope.$apply(function () {
                    callback.apply(_socket, args);
                });
            });
        }

        function emit(eventName, data, callback) {
            var _arguments2 = arguments;

            _socket.emit(eventName, data, function () {
                var args = _arguments2;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(_socket, args);
                    }
                });
            });
        }
    }
})();