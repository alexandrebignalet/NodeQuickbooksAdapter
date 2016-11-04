'use strict';

(function () {
    'use strict';

    angular.module('exampleApp').factory('AuthQuickbooksProvider', AuthQuickbooksProvider);

    function AuthQuickbooksProvider() {
        var _authInfo = void 0;
        var _available = false;

        var service = {
            setAuthInfo: setAuthInfo,
            hasAuthInfo: hasAuthInfo,
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
            var consumerKey = _ref.consumerKey,
                consumerSecret = _ref.consumerSecret;

            _authInfo = { consumerKey: consumerKey, consumerSecret: consumerSecret };
        }

        function hasAuthInfo() {
            return angular.isDefined(_authInfo);
        }

        function getHeaders() {
            return {
                "Accept": "application/json",
                "consumer-key": _authInfo.consumerKey,
                "consumer-secret": _authInfo.consumerSecret
            };
        }
    }
})();