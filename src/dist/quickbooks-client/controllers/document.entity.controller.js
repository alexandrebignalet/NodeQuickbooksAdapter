'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _entities = require('../entities.state');

var _entities2 = _interopRequireDefault(_entities);

var _documentEntity = require('../handlers/document.entity.handler');

var _documentEntity2 = _interopRequireDefault(_documentEntity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/:entityAlias/:id/pdf', function (req, res) {
    var entityAlias = req.params.entityAlias;

    if (!entityAliasValidator(entityAlias)) {
        return EntityAliasException(res, entityAlias);
    }

    var controller = new _documentEntity2.default(entityAlias);

    var id = req.params.id;

    return controller.getPdf(id).then(function (response) {
        res.contentType('application/pdf');
        return res.send(response);
    }).catch(function (e) {
        if (e.Fault) {
            return res.send({ code: 404, message: entityAlias + ' not found' });
        }
        return res.send(e);
    });
});

router.get('/:entityAlias/:id/sendTo/:email', function (req, res) {
    var entityAlias = req.params.entityAlias;

    if (!entityAliasValidator(entityAlias)) {
        return EntityAliasException(res, entityAlias);
    }

    var controller = new _documentEntity2.default(entityAlias);

    var id = req.params.id;
    var email = req.params.email;

    return controller.send(id, email).then(function (response) {
        return res.send(response);
    }).catch(function (e) {
        if (e.Fault) {
            return res.send({ code: 404, message: entityAlias + ' not found' });
        }
        return res.send(e);
    });
});

module.exports = router;

function entityAliasValidator(entityAlias) {
    return _entities2.default['document'].indexOf(entityAlias) !== -1;
}

function EntityAliasException(response, entityAlias) {
    return response.status(400).send({ code: 400, message: 'Unknown document entity ' + entityAlias });
}