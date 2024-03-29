'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = require('./entity.handler');

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DocumentQuickbooks = function (_EntityQuickbooks) {
    _inherits(DocumentQuickbooks, _EntityQuickbooks);

    function DocumentQuickbooks(entityAlias) {
        _classCallCheck(this, DocumentQuickbooks);

        return _possibleConstructorReturn(this, (DocumentQuickbooks.__proto__ || Object.getPrototypeOf(DocumentQuickbooks)).call(this, entityAlias));
    }

    _createClass(DocumentQuickbooks, [{
        key: 'getPdf',
        value: function getPdf(id) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.qbo['get' + _this2.entityAlias + 'Pdf'](id, function (err, result) {
                    return err ? reject(err) : resolve(result);
                });
            });
        }
    }, {
        key: 'send',
        value: function send(id, email) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3.qbo['send' + _this3.entityAlias + 'Pdf'](id, email, function (err, result) {
                    return err ? reject(err) : resolve(result);
                });
            });
        }
    }]);

    return DocumentQuickbooks;
}(_entity2.default);

module.exports = DocumentQuickbooks;