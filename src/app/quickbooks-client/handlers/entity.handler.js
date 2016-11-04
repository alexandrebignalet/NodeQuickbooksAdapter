'use strict'


import PlatformClient from '../platform-client'

class EntityQuickbooks {

    constructor (entityAlias) {
        this.entityAlias = entityAlias
        this.qbo = PlatformClient.client
    }

    get (id) {
        return new Promise( (resolve, reject) => {
            this.qbo['get'+this.entityAlias](id, (err, result) => {
                return err ? reject(err) :  resolve(result)
            });
        } )
    }

    update (id, patch) {
        return this.get(id)
            .then((entity) => {
                Object.assign(entity, patch)
                return new Promise( (resolve, reject) => {
                    this.qbo['update'+this.entityAlias](entity, (err, result) => {
                        return err ? reject(err) :  resolve(result)
                    });
                } )
            })
    }

    remove (id) {
        return new Promise( (resolve, reject) => {
            this.qbo['delete'+this.entityAlias](id, (err, result) => {
                return err ? reject(err) :  resolve(result)
            });
        } )
    }

    find (criteria) {
        return new Promise( (resolve, reject) => {
            this.qbo['find'+this.entityAlias+'s'](criteria, (err, result) => {
                return err ? reject(err) :  resolve(result.QueryResponse[this.entityAlias])
            });
        } )
    }

    create (entity) {
        return new Promise( (resolve, reject) => {
            this.qbo['create'+this.entityAlias](entity, (err, result) => {
                return err ? reject(err) :  resolve(result)
            });
        } )
    }
}

module.exports = EntityQuickbooks