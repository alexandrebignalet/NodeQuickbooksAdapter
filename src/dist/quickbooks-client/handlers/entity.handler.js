'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _platformClient = require('../platform-client');

var _platformClient2 = _interopRequireDefault(_platformClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntityQuickbooks = function () {
    function EntityQuickbooks(entityAlias) {
        _classCallCheck(this, EntityQuickbooks);

        this.entityAlias = entityAlias;
        this.qbo = _platformClient2.default.client;
    }

    _createClass(EntityQuickbooks, [{
        key: 'get',
        value: function get(id) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.qbo['get' + _this.entityAlias](id, function (err, result) {
                    return err ? reject(err) : resolve(result);
                });
            });
        }
    }, {
        key: 'update',
        value: function update(id, patch) {
            var _this2 = this;

            return this.get(id).then(function (entity) {
                Object.assign(entity, patch);
                return new Promise(function (resolve, reject) {
                    _this2.qbo['update' + _this2.entityAlias](entity, function (err, result) {
                        return err ? reject(err) : resolve(result);
                    });
                });
            });
        }
    }, {
        key: 'remove',
        value: function remove(id) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3.qbo['delete' + _this3.entityAlias](id, function (err, result) {
                    return err ? reject(err) : resolve(result);
                });
            });
        }
    }, {
        key: 'find',
        value: function find(criteria) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                _this4.qbo['find' + _this4.entityAlias + 's'](criteria, function (err, result) {
                    return err ? reject(err) : resolve(result.QueryResponse[_this4.entityAlias]);
                });
            });
        }
    }, {
        key: 'create',
        value: function create(entity) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                _this5.qbo['create' + _this5.entityAlias](entity, function (err, result) {
                    return err ? reject(err) : resolve(result);
                });
            });
        }
    }]);

    return EntityQuickbooks;
}();

module.exports = EntityQuickbooks;