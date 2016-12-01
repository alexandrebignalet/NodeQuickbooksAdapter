'use strict'


import express from 'express'


import quickbooksStates   from '../entities.state'
import EntityQuickbooksHandler   from '../handlers/document.entity.handler'
import ErrorHandler from "../handlers/error.handler"

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

    return controller.find(queryBuilder(req.query))
        .then( (response) => {
            return res.status(200).send(response)
        })
        .catch((error) => {
            let errorHandler = new ErrorHandler(res.statusCode, error)
            return res.status(errorHandler.code).type('json')
                .send({code:errorHandler.code, message: errorHandler.message, type: errorHandler.type})
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
        .catch((error) => {
            let errorHandler = new ErrorHandler(res.statusCode, error)
            console.log(error)
            return res.status(errorHandler.code).type('json')
                .send({code:errorHandler.code, message: errorHandler.message, type: errorHandler.type})
        })
})

router.post('/:entityAlias', (req, res) => {
    let entityAlias = req.params.entityAlias

    if (!entityAliasValidator(entityAlias, 'create')){
        return EntityAliasException(res, entityAlias, 'create')
    }

    const controller = new EntityQuickbooksHandler(entityAlias)

    const id    = req.params.id
    const post  = req.body


    return controller.create(post)
        .then( (response) => {
            return res.status(201).send(response)
        })
        .catch((error) => {
            let errorHandler = new ErrorHandler(res.statusCode, error)
            return res.status(errorHandler.code).type('json').send({code:errorHandler.code, message: errorHandler.message})
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
        .catch((error) => {
            let errorHandler = new ErrorHandler(res.statusCode, error)
            return res.status(errorHandler.code).type('json').send({code:errorHandler.code, message: errorHandler.message})
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
        .catch((error) => {
            let errorHandler = new ErrorHandler(res.statusCode, error)
            return res.status(errorHandler.code).type('json').send({code:errorHandler.code, message: errorHandler.message})
        })
})

module.exports = router

function entityAliasValidator(entityAlias, methodName){
    return quickbooksStates[methodName].indexOf(entityAlias) !== -1
}

function EntityAliasException (response, entityAlias, methodName) {
    return response.status(400).send({code:400, message: 'Impossible to '+methodName+' entity '+entityAlias})
}

function queryBuilder(queryRequest){
    let queryBuilded = [];

    for(let index in queryRequest){
        queryBuilded.push( JSON.parse(queryRequest[index]) )
    }

    return queryBuilded
}