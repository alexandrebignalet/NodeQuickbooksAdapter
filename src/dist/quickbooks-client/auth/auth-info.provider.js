'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OAuthInfoProvider = function () {
    function OAuthInfoProvider() {
        _classCallCheck(this, OAuthInfoProvider);

        var storedAuthInfo = getAuthInfoFromFile();

        this._consumerKey = storedAuthInfo.consumerKey;
        this._consumerSecret = storedAuthInfo.consumerSecret;
        this._realmId = storedAuthInfo.realmId;
        this._accessToken = storedAuthInfo.accessToken;
        this._accessTokenSecret = storedAuthInfo.accessTokenSecret;

        this._requestToken = null;
        this._requestTokenSecret = null;
    }

    _createClass(OAuthInfoProvider, [{
        key: 'authenticatedRemembered',
        value: function authenticatedRemembered(_ref) {
            var consumerKey = _ref.consumerKey,
                consumerSecret = _ref.consumerSecret;

            return this._consumerKey === consumerKey && this._consumerSecret === consumerSecret && this._accessToken !== null && this._accessTokenSecret !== null && this._realmId !== null;
        }
    }, {
        key: 'setRequestToken',
        value: function setRequestToken(requestToken, requestTokenSecret) {
            this._requestToken = requestToken;
            this._requestTokenSecret = requestTokenSecret;
        }
    }, {
        key: 'setAccessTokens',
        value: function setAccessTokens(_ref2) {
            var oauth_token = _ref2.oauth_token,
                oauth_token_secret = _ref2.oauth_token_secret;

            this._accessToken = oauth_token;
            this._accessTokenSecret = oauth_token_secret;
        }
    }, {
        key: 'stringifyAuthInfo',
        value: function stringifyAuthInfo() {
            return JSON.stringify({
                consumerKey: this.consumerKey,
                consumerSecret: this.consumerSecret,
                accessToken: this.accessToken,
                accessTokenSecret: this.accessTokenSecret,
                realmId: this.realmId
            });
        }
    }, {
        key: 'consumerKey',
        set: function set(key) {
            this._consumerKey = key;
        },
        get: function get() {
            return this._consumerKey;
        }
    }, {
        key: 'consumerSecret',
        set: function set(key) {
            this._consumerSecret = key;
        },
        get: function get() {
            return this._consumerSecret;
        }
    }, {
        key: 'realmId',
        get: function get() {
            return this._realmId;
        },
        set: function set(realmId) {
            this._realmId = realmId;
        }
    }, {
        key: 'requestTokenSecret',
        get: function get() {
            return this._requestTokenSecret;
        }
    }, {
        key: 'accessToken',
        get: function get() {
            return this._accessToken;
        }
    }, {
        key: 'accessTokenSecret',
        get: function get() {
            return this._accessTokenSecret;
        }
    }]);

    return OAuthInfoProvider;
}();

module.exports = new OAuthInfoProvider();

function getAuthInfoFromFile() {
    var storedAuthInfo = void 0;

    try {
        storedAuthInfo = JSON.parse(_fs2.default.readFileSync(__dirname + "/../../../access_tokens.json"));
    } catch (e) {
        console.log('Impossible to read: ', __dirname + "/../../../access_tokens.json");
        storedAuthInfo = {
            consumerKey: null,
            consumerSecret: null,
            realmId: null,
            accessToken: null,
            accessTokenSecret: null
        };
    }

    return storedAuthInfo;
}