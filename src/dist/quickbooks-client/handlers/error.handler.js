'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xml2js = require('xml2js');

var _xml2js2 = _interopRequireDefault(_xml2js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var xmlParser = _xml2js2.default.parseString;

/**
 * Transform Quickbooks Error to HTTP Standards Errors
 */

var ErrorHandler = function () {
    function ErrorHandler(statusCode, error) {
        _classCallCheck(this, ErrorHandler);

        var tmp = createErrorMessage(statusCode, error);
        this._message = tmp.message;
        this._code = tmp.code;
        this._type = tmp.type;
    }

    _createClass(ErrorHandler, [{
        key: 'message',
        get: function get() {
            return this._message;
        }
    }, {
        key: 'code',
        get: function get() {
            return this._code;
        }
    }, {
        key: 'type',
        get: function get() {
            return this._type;
        }
    }]);

    return ErrorHandler;
}();

module.exports = ErrorHandler;

var JSON_FORMAT = 'JSON';
var XML_FORMAT = 'XML';

var QUICKBOOKS_ERROR_TYPE = [{
    type: 'ValidationFault',
    code: 400
}, {
    type: 'SystemFault',
    code: 500
}, {
    type: 'AuthenticationFault',
    code: 401
}, {
    type: 'AuthorizationFault',
    code: 403
}];

function identifyErrorFormatType(statusCode, error) {
    if (statusCode === 200 && !error.Fault) {
        return XML_FORMAT;
    }
    return JSON_FORMAT;
}

function createErrorMessage(statusCode, error) {
    var errMessage = {
        code: null,
        message: null,
        type: null
    };

    if (identifyErrorFormatType(statusCode, error) === JSON_FORMAT) {

        var errorIndex = arrayObjectIndexOf(QUICKBOOKS_ERROR_TYPE, error.Fault.type, 'type');

        if (errorIndex === -1) {
            errMessage = { code: 500, message: error.Fault.Error, type: error.Fault.type };
        } else {
            errMessage = { code: QUICKBOOKS_ERROR_TYPE[errorIndex].code, message: error.Fault.Error, type: QUICKBOOKS_ERROR_TYPE[errorIndex].type };
        }
    } else {
        xmlParser(error, function (err, result) {
            if (err) {
                return errMessage = { code: 500, message: 'XML parsing failed', type: 'NodeClient SystemFault' };
            }

            var faults = result.IntuitResponse.Fault;

            for (var i = 0; i < faults.length; i++) {
                if (faults[i].$) {

                    var _errorIndex = arrayObjectIndexOf(QUICKBOOKS_ERROR_TYPE, faults[i].$.type, 'type');

                    if (_errorIndex !== -1) {
                        errMessage = { code: QUICKBOOKS_ERROR_TYPE[_errorIndex].code, type: QUICKBOOKS_ERROR_TYPE[_errorIndex].type };
                    } else {
                        errMessage.type = faults[i].$.type;
                    }
                }
                if (faults[i].Error) {
                    var quickbooksErrors = faults[i].Error;
                    for (var y = 0; y < quickbooksErrors.length; y++) {
                        if (quickbooksErrors[y].Message) {
                            errMessage = messageXMLDecoder(quickbooksErrors[y].Message[0]);
                            errMessage.type = faults[i].$.type;
                        }
                    }
                }
            }
        });
    }

    return errMessage;
}

function arrayObjectIndexOf(myArray, searchTerm, property) {
    for (var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}

/**
 * input type example: [ 'message=ApplicationAuthenticationFailed; errorCode=003200; statusCode=401' ]
 * @param string
 */
function messageXMLDecoder(string) {

    var i = 0;
    var message = '',
        code = '',
        errorCode = '';

    var attr = false,
        prop = true,
        countProp = 0;

    while (i !== string.length) {

        if (string.charAt(i) === '=') {
            attr = true;
            prop = false;
            i++; //escape the space
        }
        if (string.charAt(i) === ';') {
            attr = false;
            prop = true;
            countProp++;
        }
        if (attr && countProp === 0) {
            message = message + string.charAt(i);
        }
        if (attr && countProp === 1) {
            errorCode = errorCode + string.charAt(i);
        }
        if (attr && countProp === 2) {
            code = code + string.charAt(i);
        }
        i++;
    }

    code = +code;

    return { code: code, message: message };
}