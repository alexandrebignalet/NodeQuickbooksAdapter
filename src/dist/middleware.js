'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _middleware = require('./quickbooks-client/middleware.quickbooks');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Middleware add headers
router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', _config2.default.env.url);
    res.setHeader('Access-Control-Allow-Headers', 'X-Auth-Token,' + 'content-type, ' + 'Access-Control-Allow-Origin' + 'consumer-key' + 'consumer-secret' + 'app-token' + 'realm-id');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Middleware Quickbooks
router.use('/quickbooks', _middleware2.default);

module.exports = router;