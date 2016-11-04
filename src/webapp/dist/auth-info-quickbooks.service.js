'use strict';

(function () {
    'use strict';

    angular.module('exampleApp').factory('AuthInfoQuickbooksProvider', AuthInfoQuickbooksProvider);

    AuthInfoQuickbooksProvider.$inject = ['NodeSocker'];

    function AuthInfoQuickbooksProvider(NodeSocket) {
        var _authInfo = void 0;
        var _available = false;

        NodeSocket.on('quickbooks_access_tokens_generated', function () {
            _available = true;
        });

        var service = {
            setAuthInfo: setAuthInfo,
            getAuthInfo: getAuthInfo,
            getHeaders: getHeaders,
            isAvailable: isAvailable,
            setAvailable: setAvailable
        };

        return service;

        function isAvailable() {
            return _available;
        }

        function setAvailable(bool) {
            _available = bool;
        }

        function setAuthInfo(_ref) {
            var appToken = _ref.appToken,
                consumerKey = _ref.consumerKey,
                consumerSecret = _ref.consumerSecret,
                realmId = _ref.realmId;

            _authInfo = { appToken: appToken, consumerKey: consumerKey, consumerSecret: consumerSecret, realmId: realmId };
        }

        function getAuthInfo() {
            return _authInfo;
        }

        function getHeaders() {
            return {
                "Accept": "application/json",
                "app-token": _authInfo.appToken,
                "consumer-key": _authInfo.consumerKey,
                "consumer-secret": _authInfo.consumerSecret,
                "realm-id": _authInfo.realmId
            };
        }
    }
})();