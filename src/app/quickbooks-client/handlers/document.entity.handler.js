'use strict'


import EntityQuickbooks from './entity.handler'


class DocumentQuickbooks extends EntityQuickbooks {

    constructor(entityAlias){
        super(entityAlias)
    }

    getPdf (id) {
        return new Promise( (resolve, reject) => {
            this.qbo['get'+this.entityAlias+'Pdf'](id, (err, result) => {
                return err ? reject(err) :  resolve(result)
            });
        } )
    }

    send (id, email) {
        return new Promise( (resolve, reject) => {
            this.qbo['send'+this.entityAlias+'Pdf'](id, email, (err, result) => {
                return err ? reject(err) :  resolve(result)
            });
        } )
    }
}

module.exports = DocumentQuickbooks