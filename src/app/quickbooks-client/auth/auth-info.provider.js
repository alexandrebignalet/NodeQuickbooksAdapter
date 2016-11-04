'use strict'


class OAuthInfoProvider{
    constructor(){
        this._consumerKey = null
        this._consumerSecret = null
        this._realmId = null

        this._requestToken = null
        this._requestTokenSecret = null

        this._accessToken = null
        this._accessTokenSecret = null
    }

    init (consumerKey, consumerSecret) {
        this._consumerKey = consumerKey
        this._consumerSecret = consumerSecret
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

    setAccessToken ({ oauth_token_secret, oauth_token}) {
        this._accessTokenSecret = oauth_token_secret
        this._accessToken = oauth_token
    }

    get accessToken () {
        return this._accessToken
    }

    get accessTokenSecret () {
        return this._accessTokenSecret
    }
}


module.exports = new OAuthInfoProvider()