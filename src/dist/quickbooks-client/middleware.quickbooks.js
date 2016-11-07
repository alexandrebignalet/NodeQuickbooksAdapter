'use strict';

var _authInfo = require('./auth/auth-info.provider');

var _authInfo2 = _interopRequireDefault(_authInfo);

var _platformClient = require('./platform-client');

var _platformClient2 = _interopRequireDefault(_platformClient);

var _socketIo = require('../socket-io.service');

var _socketIo2 = _interopRequireDefault(_socketIo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_socketIo2.default.on('connection', function () {
    if (!(_authInfo2.default.accessToken && _authInfo2.default.accessTokenSecret)) {
        return _socketIo2.default.emit('quickbooks_not_available');
    }
    _socketIo2.default.emit('quickbooks_available');
});

function quickBooksMiddleware(req, res, next) {

    if (req.url.includes('connection')) {
        return next();
    }

    if (!(req.headers && req.headers['consumer-key'] && req.headers['consumer-secret'])) {
        return res.status(401).send({ code: 401, message: 'Impossible to identify quickbooks user.' });
    }

    var consumerKey = req.headers['consumer-key'];
    var consumerSecret = req.headers['consumer-secret'];

    if (_authInfo2.default.authenticatedRemembered({ consumerKey: consumerKey, consumerSecret: consumerSecret })) {
        _platformClient2.default.createQBOClient(_authInfo2.default.consumerKey, _authInfo2.default.consumerSecret, _authInfo2.default.accessToken, _authInfo2.default.accessTokenSecret, _authInfo2.default.realmId);

        return next();
    } else {
        _authInfo2.default.consumerKey = consumerKey;
        _authInfo2.default.consumerSecret = consumerSecret;

        _socketIo2.default.emit('quickbooks_not_available');
    }

    if (req.url.includes('auth')) {
        return next();
    }

    next();
}

module.exports = quickBooksMiddleware;