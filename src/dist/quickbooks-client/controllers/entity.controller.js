'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _entities = require('../entities.state');

var _entities2 = _interopRequireDefault(_entities);

var _documentEntity = require('../handlers/document.entity.handler');

var _documentEntity2 = _interopRequireDefault(_documentEntity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = _express2.default.Router();

/*
 * Input example:
 *
 * [{"field": "TxnDate", "value": "2016-10-01", "operator": ">"},
 *  {"field": "TxnDate", "value": "2016-10-31", "operator": "<"},
 *  {"field": "limit", "value": "5"}}
 *
 */
router.get('/:entityAlias/', function (req, res) {
    var entityAlias = req.params.entityAlias;

    if (!entityAliasValidator(entityAlias, 'query')) {
        return EntityAliasException(res, entityAlias, 'query');
    }

    var controller = new _documentEntity2.default(entityAlias);

    return controller.find(queryBuilder(req.query)).then(function (response) {
        var _res$send;

        return res.send((_res$send = {}, _defineProperty(_res$send, entityAlias + 's', response), _defineProperty(_res$send, 'count', response.length), _res$send));
    }).catch(function (e) {
        return QuickbooksErrorHandler(res, e);
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
        return res.send(response);
    }).catch(function (e) {
        return QuickbooksErrorHandler(res, e);
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
        return res.send(response);
    }).catch(function (e) {
        return QuickbooksErrorHandler(res, e);
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
        return res.send(response);
    }).catch(function (e) {
        return QuickbooksErrorHandler(res, e);
    });
});

module.exports = router;

function entityAliasValidator(entityAlias, methodName) {
    return _entities2.default[methodName].indexOf(entityAlias) !== -1;
}

function EntityAliasException(response, entityAlias, methodName) {
    return response.status(400).send({ code: 400, message: 'Impossible to ' + methodName + ' entity ' + entityAlias });
}

function QuickbooksErrorHandler(response, error) {
    var message = {
        code: 404,
        message: error
    };

    if (error.Fault) {
        if (error.Fault.type) {
            message.code = 400;
            message.message = error.Fault.Error;
        }
    }
    return response.status(message.code).type('json').send(message);
}

function queryBuilder(queryRequest) {
    var queryBuilded = [];

    for (var index in queryRequest) {
        queryBuilded.push(JSON.parse(queryRequest[index]));
    }

    return queryBuilded;
}