'use strict'


import express      from 'express'

import quickbooksStates          from '../entities.state'
import DocumentQuickbooksHandler from '../handlers/document.entity.handler'


const router = express.Router()


router.get('/:entityAlias/:id/pdf', (req, res) => {
    let entityAlias = req.params.entityAlias

    if (!entityAliasValidator(entityAlias)){
        return EntityAliasException(res, entityAlias)
    }

    const controller = new DocumentQuickbooksHandler(entityAlias)

    var id = req.params.id;


    return controller.getPdf(id)
        .then( (response) => {
            res.contentType('application/pdf')
            return res.status(200).send(response)
        })
        .catch((error) => {
            if (error.Fault){
                return res.status(404).send({code:404, message:entityAlias+' not found'})
            }
            return res.status(500).send({code:500, message:error})
        })
})

router.get('/:entityAlias/:id/sendTo/:email', (req, res) => {
    let entityAlias = req.params.entityAlias

    if (!entityAliasValidator(entityAlias)){
        return EntityAliasException(res, entityAlias)
    }

    const controller = new DocumentQuickbooksHandler(entityAlias)

    let id = req.params.id;
    let email = req.params.email;

    return controller.send(id, email)
        .then( (response) => {
            return res.send(response)
        })
        .catch((error) => {
            if (error.Fault){
                return res.status(404).send({code:404, message:entityAlias+' not found'})
            }
            return res.status(500).send({code:500, message:error})
        })
})

module.exports = router


function entityAliasValidator(entityAlias){
    return quickbooksStates['document'].indexOf(entityAlias) !== -1
}

function EntityAliasException (response, entityAlias) {
    return response.status(400).send({code:400, message: 'Unknown document entity '+entityAlias})
}