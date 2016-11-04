'use strict'


import OAuthInfoProvider    from './auth/auth-info.provider'
import PlatformClient       from './platform-client'
import io                   from '../socket-io.service'

io.on('connection', () => {
    if (!(OAuthInfoProvider.accessToken && OAuthInfoProvider.accessTokenSecret )){
        return io.emit('quickbooks_not_available')
    }
    io.emit('quickbooks_available')
})

function quickBooksMiddleware (req, res, next) {

    if ( req.url.includes('connection')) {
        return next()
    }

    if(!(req.headers && req.headers['consumer-key'] && req.headers['consumer-secret'] )){
        return res.status(401).send({code:401, message:'Impossible to identify quickbooks user.'})
    }

    const consumerKey = req.headers['consumer-key']
    const consumerSecret = req.headers['consumer-secret']

    if ( OAuthInfoProvider.authenticatedRemembered({consumerKey, consumerSecret}) ){
        PlatformClient.createQBOClient(
            OAuthInfoProvider.consumerKey,
            OAuthInfoProvider.consumerSecret,
            OAuthInfoProvider.accessToken,
            OAuthInfoProvider.accessTokenSecret,
            OAuthInfoProvider.realmId
        )

        return next()
    } else {
        OAuthInfoProvider.consumerKey = consumerKey
        OAuthInfoProvider.consumerSecret = consumerSecret

        io.emit('quickbooks_not_available')
    }

    if ( req.url.includes('auth')) {
        return next()
    }

    next()
}

module.exports = quickBooksMiddleware