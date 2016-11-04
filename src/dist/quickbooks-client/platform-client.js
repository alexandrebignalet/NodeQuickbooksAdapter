'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeQuickbooks = require('node-quickbooks');

var _nodeQuickbooks2 = _interopRequireDefault(_nodeQuickbooks);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlatformClient = function () {
    function PlatformClient() {
        _classCallCheck(this, PlatformClient);

        this._client = null;
        this.APP_CENTER_URL = _nodeQuickbooks2.default.APP_CENTER_URL;
        this.REQUEST_TOKEN_URL = _nodeQuickbooks2.default.REQUEST_TOKEN_URL;
        this.ACCESS_TOKEN_URL = _nodeQuickbooks2.default.ACCESS_TOKEN_URL;
        this.CALLBACK_URL = _config2.default.env.fullUrl() + '/quickbooks/auth/connection';
    }

    _createClass(PlatformClient, [{
        key: 'createQBOClient',
        value: function createQBOClient(consumerKey, consumerSecret, accessToken, accessTokenSecret, realmId) {
            this._client = new _nodeQuickbooks2.default(consumerKey, consumerSecret, accessToken, accessTokenSecret, realmId, _config2.default.quickBooksConfig.useSandbox, // use the Sandbox
            _config2.default.quickBooksConfig.debug);
        }
    }, {
        key: 'hasClient',
        value: function hasClient() {
            return this._client !== null;
        }
    }, {
        key: 'client',
        get: function get() {
            return this._client;
        }
    }]);

    return PlatformClient;
}();

module.exports = new PlatformClient();