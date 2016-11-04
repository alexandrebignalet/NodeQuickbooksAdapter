(function () {
    'use strict';

    angular
        .module('exampleApp')
        .factory('NodeSocket', NodeSocket);

    NodeSocket.$inject = ['$rootScope', 'NODE_SOCKET_BASE_URL', 'AuthQuickbooksProvider'];

    /* @ngInject */
    function NodeSocket($rootScope, NODE_SOCKET_BASE_URL, AuthQuickbooksProvider) {
        let connected = false

        const _socket = io.connect(NODE_SOCKET_BASE_URL, {
            'reconnection': true,
            'reconnectionDelay': 1000,
            'reconnectionDelayMax' : 5000,
            'reconnectionAttempts': 4
        })

        const service = {
            isConnected,
            on,
            emit
        };

        on('connect', () => {
            connected = true
            console.log('connected')
        })

        on('connect_error', () => {
            connected = false
            AuthQuickbooksProvider.setAvailable(false)
        })

        on('quickbooks_authentication_success', () => {
            AuthQuickbooksProvider.setAvailable(true)
        })

        on('quickbooks_available', () => {
            AuthQuickbooksProvider.setAvailable(true)
        })

        on('quickbooks_not_available', () => {
            AuthQuickbooksProvider.setAvailable(false)
        })

        return service;

        ////////////////

        function isConnected () {
            return connected
        }

        function on (eventName, callback) {
            _socket.on(eventName, () => {
                var args = arguments;
                $rootScope.$apply( () => {
                    callback.apply(_socket, args);
                });
            });
        }

        function emit (eventName, data, callback) {
            _socket.emit(eventName, data, () => {
                var args = arguments;
                $rootScope.$apply( () => {
                    if (callback) {
                        callback.apply(_socket, args);
                    }
                });
            })
        }
    }

})();

