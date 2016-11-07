'use strict'

import fs from 'fs'

class OAuthInfoProvider{
    constructor(){
        const storedAuthInfo = getAuthInfoFromFile()

        this._consumerKey = storedAuthInfo.consumerKey
        this._consumerSecret = storedAuthInfo.consumerSecret
        this._realmId = storedAuthInfo.realmId
        this._accessToken = storedAuthInfo.accessToken
        this._accessTokenSecret = storedAuthInfo.accessTokenSecret
        
        this._requestToken = null
        this._requestTokenSecret = null
    }

    authenticatedRemembered ({consumerKey, consumerSecret}) {
        return this._consumerKey === consumerKey &&
                this._consumerSecret === consumerSecret &&
                this._accessToken !== null &&
                this._accessTokenSecret !== null &&
                this._realmId !== null
    }

    set consumerKey (key) {
        this._consumerKey = key
    }

    set consumerSecret (key) {
        this._consumerSecret = key
    }

    get consumerKey () {
        return this._consumerKey
    }

    get consumerSecret () {
        return this._consumerSecret
    }

    get realmId () {
        return this._realmId
    }

    set realmId (realmId) {
        this._realmId = realmId
    }

    get requestTokenSecret () {
        return this._requestTokenSecret
    }

    setRequestToken (requestToken, requestTokenSecret) {
        this._requestToken = requestToken
        this._requestTokenSecret = requestTokenSecret
    }

    get accessToken () {
        return this._accessToken
    }

    get accessTokenSecret () {
        return this._accessTokenSecret
    }

    setAccessTokens ({oauth_token, oauth_token_secret}) {
        this._accessToken = oauth_token
        this._accessTokenSecret = oauth_token_secret
    }

    stringifyAuthInfo(){
        return JSON.stringify({
            consumerKey: this.consumerKey,
            consumerSecret: this.consumerSecret,
            accessToken: this.accessToken,
            accessTokenSecret: this.accessTokenSecret,
            realmId: this.realmId
        })
    }
}

module.exports = new OAuthInfoProvider()

function getAuthInfoFromFile () {
    let storedAuthInfo;

    try {
        storedAuthInfo = JSON.parse(fs.readFileSync(__dirname + "/../../../access_tokens.json"))
    } catch (e) {
        console.log('Impossible to read: ', __dirname + "/../../../access_tokens.json")
        storedAuthInfo = {
            consumerKey: null,
            consumerSecret: null,
            realmId: null,
            accessToken: null,
            accessTokenSecret: null
        }
    }
    
    return storedAuthInfo
}