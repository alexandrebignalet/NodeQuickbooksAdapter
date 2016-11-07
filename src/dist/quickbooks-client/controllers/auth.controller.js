'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _authInfo = require('../auth/auth-info.provider');

var _authInfo2 = _interopRequireDefault(_authInfo);

var _platformClient = require('../platform-client');

var _platformClient2 = _interopRequireDefault(_platformClient);

var _socketIo = require('../../socket-io.service');

var _socketIo2 = _interopRequireDefault(_socketIo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/requestToken', function (req, res) {

    var postBody = {
        url: _platformClient2.default.REQUEST_TOKEN_URL,
        oauth: {
            callback: _platformClient2.default.CALLBACK_URL,
            consumer_key: _authInfo2.default.consumerKey,
            consumer_secret: _authInfo2.default.consumerSecret
        }
    };

    _request2.default.post(postBody, function (error, response, data) {
        var requestToken = _querystring2.default.parse(data);

        _authInfo2.default.setRequestToken(requestToken.oauth_token, requestToken.oauth_token_secret);

        res.status(200).send(_platformClient2.default.APP_CENTER_URL + requestToken.oauth_token);
    }).on('error', function (error) {
        res.status(500).send({ code: 500, message: error });
    });
});

router.get('/requestTokenWithExpiration', function (req, res) {

    var postBody = {
        url: 'https://appcenter.intuit.com/Playground/OAuth/BeginIAFlow',
        oauth: {
            callback: _platformClient2.default.CALLBACK_URL,
            consumer_key: _authInfo2.default.consumerKey,
            consumer_secret: _authInfo2.default.consumerSecret
        }
    };

    _request2.default.post(postBody, function (error, response, data) {
        var requestToken = _querystring2.default.parse(data);

        _authInfo2.default.setRequestToken(requestToken.oauth_token, requestToken.oauth_token_secret);

        res.status(200).send(_platformClient2.default.APP_CENTER_URL + requestToken.oauth_token);
    }).on('error', function (error) {
        res.status(500).send({ code: 500, message: error });
    });
});

router.get('/connection', function (req, res) {

    _authInfo2.default.realmId = req.query.realmId;

    var postBody = {
        url: _platformClient2.default.ACCESS_TOKEN_URL,
        oauth: {
            consumer_key: _authInfo2.default.consumerKey,
            consumer_secret: _authInfo2.default.consumerSecret,
            token: req.query.oauth_token,
            token_secret: _authInfo2.default.requestTokenSecret,
            verifier: req.query.oauth_verifier,
            realmId: _authInfo2.default.realmId
        }
    };

    res.send('<script>window.close()</script>');

    _request2.default.post(postBody, function (e, r, data) {
        var accessToken = _querystring2.default.parse(data);

        _authInfo2.default.setAccessTokens(accessToken);
        _fs2.default.writeFileSync(__dirname + "/../../../access_tokens.json", _authInfo2.default.stringifyAuthInfo());

        _socketIo2.default.emit('quickbooks_authentication_success');
    }).on('error', function (error) {
        res.status(500).send({ code: 500, message: error });
    });
});

module.exports = router;