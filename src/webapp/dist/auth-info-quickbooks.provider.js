'use strict';

(function () {
    'use strict';

    angular.module('exampleApp').factory('AuthInfoQuickbooksProvider', AuthInfoQuickbooksProvider);

    function AuthInfoQuickbooksProvider() {
        var _authInfo = void 0;

        var service = {
            setAuthInfo: setAuthInfo,
            getAuthInfo: getAuthInfo,
            getHeaders: getHeaders
        };

        return service;

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
                "app-token": _authInfo.appToken,
                "consumer-key": _authInfo.consumerKey,
                "consumer-secret": _authInfo.consumerSecret,
                "realm-id": _authInfo.realmId
            };
        }
    }
})();