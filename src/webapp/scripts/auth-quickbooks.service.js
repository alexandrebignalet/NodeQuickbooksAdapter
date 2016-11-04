(function () {
    'use strict'

    angular
        .module('exampleApp')
        .factory('AuthQuickbooksProvider', AuthQuickbooksProvider)

    function AuthQuickbooksProvider() {
        let _authInfo;
        let _available = false

        const service = {
            setAuthInfo,
            hasAuthInfo,
            getHeaders,
            isAvailable,
            setAvailable
        }

        return service

        function isAvailable () {
            return _available
        }

        function setAvailable (bool) {
            _available = bool
        }

        function setAuthInfo ({ consumerKey, consumerSecret }){
            _authInfo = { consumerKey, consumerSecret }
        }

        function hasAuthInfo () {
            return angular.isDefined(_authInfo)
        }

        function getHeaders () {
            return {
                "Accept": "application/json",
                "consumer-key": _authInfo.consumerKey,
                "consumer-secret": _authInfo.consumerSecret
            }
        }
    }
})();