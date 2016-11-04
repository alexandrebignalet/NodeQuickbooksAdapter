'use strict'


import QuickBooks   from 'node-quickbooks'
import config from '../config'


class PlatformClient{
    constructor (){
        this._client = null
        this.APP_CENTER_URL = QuickBooks.APP_CENTER_URL
        this.REQUEST_TOKEN_URL = QuickBooks.REQUEST_TOKEN_URL
        this.ACCESS_TOKEN_URL = QuickBooks.ACCESS_TOKEN_URL
        this.CALLBACK_URL = config.env.fullUrl()+'/quickbooks/auth/connection'
    }

    createQBOClient (consumerKey, consumerSecret, accessToken, accessTokenSecret, realmId) {
        this._client = new QuickBooks(
            consumerKey,
            consumerSecret,
            accessToken,
            accessTokenSecret,
            realmId,
            config.quickBooksConfig.useSandbox, // use the Sandbox
            config.quickBooksConfig.debug
        );
    }

    get client () {
        return this._client
    }

    hasClient(){
        return this._client !== null
    }
}

module.exports = new PlatformClient()