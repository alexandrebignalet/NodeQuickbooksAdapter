'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// use body parser so we can get info from POST and/or URL parameters
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

// init session
app.use((0, _expressSession2.default)({ resave: false, saveUninitialized: false, secret: 'jfcjgjlg39780345332343435.234535()/&(R%' }));

// use morgan to log requests to the console
app.use((0, _morgan2.default)('dev'));

// handle cors request
app.use((0, _cors2.default)());

// Route loading
_routes2.default.map(function (controller) {
    app.use('/' + controller.name, require(controller.require));
});

app.listen(_config2.default.env.port);
console.log('WebServer listening on http://localhost:' + _config2.default.env.port);