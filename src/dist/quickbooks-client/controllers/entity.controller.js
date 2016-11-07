'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _entities = require('../entities.state');

var _entities2 = _interopRequireDefault(_entities);

var _documentEntity = require('../handlers/document.entity.handler');

var _documentEntity2 = _interopRequireDefault(_documentEntity);

var _error = require('../handlers/error.handler');

var _error2 = _interopRequireDefault(_error);

var _authInfo = require('../auth/auth-info.provider');

var _authInfo2 = _interopRequireDefault(_authInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = _express2.default.Router();

/*
 * Input example:
 *
 * [{"field": "TxnDate", "value": "2016-10-01", "operator": ">"},
 *  {"field": "TxnDate", "value": "2016-10-31", "operator": "<"},
 *  {"field": "limit", "value": "5"}]
 *
 *  Pass filters in query string. Each object in a query param
 *  Query String Parameters:
 *      1: {"field": "TxnDate", "value": "2016-10-01", "operator": ">"}
 *      2: {"field": "TxnDate", "value": "2016-10-31", "operator": "<"}
 *      3: {"field": "limit", "value": "5"}
 *
 *
 */
router.get('/:entityAlias/', function (req, res) {
    var entityAlias = req.params.entityAlias;

    if (!entityAliasValidator(entityAlias, 'query')) {
        return EntityAliasException(res, entityAlias, 'query');
    }

    var controller = new _documentEntity2.default(entityAlias);

    return controller.find(queryBuilder(req.query)).then(function (response) {
        var _res$status$send;

        return res.status(200).send((_res$status$send = {}, _defineProperty(_res$status$send, entityAlias + 's', response), _defineProperty(_res$status$send, 'count', response.length), _res$status$send));
    }).catch(function (error) {
        var errorHandler = new _error2.default(res.statusCode, error);
        return res.status(errorHandler.code).type('json').send({ code: errorHandler.code, message: errorHandler.message });
    });
});

router.get('/:entityAlias/:id', function (req, res) {
    var entityAlias = req.params.entityAlias;

    if (!entityAliasValidator(entityAlias, 'get')) {
        return EntityAliasException(res, entityAlias, 'get');
    }

    var controller = new _documentEntity2.default(entityAlias);

    var id = req.params.id;

    return controller.get(id).then(function (response) {
        return res.status(200).send(response);
    }).catch(function (error) {
        var errorHandler = new _error2.default(res.statusCode, error);
        console.log(error);
        return res.status(errorHandler.code).type('json').send({ code: errorHandler.code, message: errorHandler.message });
    });
});

router.patch('/:entityAlias/:id', function (req, res) {
    var entityAlias = req.params.entityAlias;

    if (!entityAliasValidator(entityAlias, 'update')) {
        return EntityAliasException(res, entityAlias, 'update');
    }

    var controller = new _documentEntity2.default(entityAlias);

    var id = req.params.id;
    var patch = req.body;

    return controller.update(id, patch).then(function (response) {
        return res.status(200).send(response);
    }).catch(function (error) {
        var errorHandler = new _error2.default(res.statusCode, error);
        return res.status(errorHandler.code).type('json').send({ code: errorHandler.code, message: errorHandler.message });
    });
});

router.delete('/:entityAlias/:id', function (req, res) {
    var entityAlias = req.params.entityAlias;

    if (!entityAliasValidator(entityAlias, 'delete')) {
        return EntityAliasException(res, entityAlias, 'delete');
    }
    var controller = new _documentEntity2.default(entityAlias);

    var id = req.params.id;

    return controller.remove(id).then(function (response) {
        return res.status(200).send(response);
    }).catch(function (error) {
        var errorHandler = new _error2.default(res.statusCode, error);
        return res.status(errorHandler.code).type('json').send({ code: errorHandler.code, message: errorHandler.message });
    });
});

module.exports = router;

function entityAliasValidator(entityAlias, methodName) {
    return _entities2.default[methodName].indexOf(entityAlias) !== -1;
}

function EntityAliasException(response, entityAlias, methodName) {
    return response.status(400).send({ code: 400, message: 'Impossible to ' + methodName + ' entity ' + entityAlias });
}

function queryBuilder(queryRequest) {
    var queryBuilded = [];

    for (var index in queryRequest) {
        queryBuilded.push(JSON.parse(queryRequest[index]));
    }

    return queryBuilded;
}