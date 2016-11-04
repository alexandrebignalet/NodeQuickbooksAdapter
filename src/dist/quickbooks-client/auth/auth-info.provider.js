'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OAuthInfoProvider = function () {
    function OAuthInfoProvider() {
        _classCallCheck(this, OAuthInfoProvider);

        this._consumerKey = null;
        this._consumerSecret = null;
        this._realmId = null;

        this._requestToken = null;
        this._requestTokenSecret = null;

        this._accessToken = null;
        this._accessTokenSecret = null;
    }

    _createClass(OAuthInfoProvider, [{
        key: 'init',
        value: function init(consumerKey, consumerSecret) {
            this._consumerKey = consumerKey;
            this._consumerSecret = consumerSecret;
        }
    }, {
        key: 'setRequestToken',
        value: function setRequestToken(requestToken, requestTokenSecret) {
            this._requestToken = requestToken;
            this._requestTokenSecret = requestTokenSecret;
        }
    }, {
        key: 'setAccessToken',
        value: function setAccessToken(_ref) {
            var oauth_token_secret = _ref.oauth_token_secret,
                oauth_token = _ref.oauth_token;

            this._accessTokenSecret = oauth_token_secret;
            this._accessToken = oauth_token;
        }
    }, {
        key: 'consumerKey',
        get: function get() {
            return this._consumerKey;
        }
    }, {
        key: 'consumerSecret',
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