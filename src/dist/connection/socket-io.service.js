'use strict';

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var io = new _socket2.default(_config2.default.env.socketPort);
console.log('WebSocket listening on http://localhost:' + _config2.default.env.socketPort);

io.on('connection', function () {
    console.log('user connected');
});

module.exports = io;