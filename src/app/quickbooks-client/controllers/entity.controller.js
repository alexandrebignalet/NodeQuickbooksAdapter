'use strict'


import express from 'express'


import quickbooksStates   from '../entities.state'
import EntityQuickbooksHandler   from '../handlers/document.entity.handler'


const router = express.Router()


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
router.get('/:entityAlias/', (req, res) => {
    let entityAlias = req.params.entityAlias

    if (!entityAliasValidator(entityAlias, 'query')){
        return EntityAliasException(res, entityAlias, 'query')
    }

    const controller = new EntityQuickbooksHandler(entityAlias)
// return res.send(req.query)
    return controller.find(queryBuilder(req.query))
        .then( (response) => {
            return res.status(200).send({
                [entityAlias+'s']: response,
                count: response.length
            })
        })
        .catch((e) => {
            return QuickbooksErrorHandler(res, e)
        })
});

router.get('/:entityAlias/:id', (req, res) => {
    let entityAlias = req.params.entityAlias

    if (!entityAliasValidator(entityAlias, 'get')){
        return EntityAliasException(res, entityAlias, 'get')
    }

    const controller = new EntityQuickbooksHandler(entityAlias)

    const id = req.params.id;

    return controller.get(id)
        .then( (response) => {
            return res.status(200).send(response)
        })
        .catch((e) => {
            return QuickbooksErrorHandler(res, e)
        })
})

router.patch('/:entityAlias/:id', (req, res) => {
    let entityAlias = req.params.entityAlias

    if (!entityAliasValidator(entityAlias, 'update')){
        return EntityAliasException(res, entityAlias, 'update')
    }

    const controller = new EntityQuickbooksHandler(entityAlias)

    const id    = req.params.id
    const patch = req.body


    return controller.update(id, patch)
        .then( (response) => {
            return res.status(200).send(response)
        })
        .catch((e) => {
            return QuickbooksErrorHandler(res, e)
        })
})

router.delete('/:entityAlias/:id', (req, res) => {
    let entityAlias = req.params.entityAlias

    if (!entityAliasValidator(entityAlias, 'delete')){
        return EntityAliasException(res, entityAlias, 'delete')
    }
    const controller = new EntityQuickbooksHandler(entityAlias)

    const id = req.params.id;

    return controller.remove(id)
        .then( (response) => {
            return res.status(200).send(response)
        })
        .catch((e) => {
            return QuickbooksErrorHandler(res, e)
        })
})

module.exports = router

function entityAliasValidator(entityAlias, methodName){
    return quickbooksStates[methodName].indexOf(entityAlias) !== -1
}

function EntityAliasException (response, entityAlias, methodName) {
    return response.status(400).send({code:400, message: 'Impossible to '+methodName+' entity '+entityAlias})
}

function QuickbooksErrorHandler (response, error){
    var message = {
        code: 404,
        message: error
    };

    if (error.Fault){
        if(error.Fault.type){
            message.code = 400
            message.message = error.Fault.Error
        }
    }
    return response.status(message.code).type('json').send(message)
}

function queryBuilder(queryRequest){
    let queryBuilded = [];

    for(let index in queryRequest){
        queryBuilded.push( JSON.parse(queryRequest[index]) )
    }

    return queryBuilded
}