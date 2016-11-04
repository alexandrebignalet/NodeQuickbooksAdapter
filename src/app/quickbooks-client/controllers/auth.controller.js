'use strict';


import express from 'express'
import request from 'request'
import qs      from 'querystring'


import OAuthInfoProvider from '../auth/auth-info.provider'
import PlatformClient from '../platform-client'
import io                   from '../../socket-io.service'


const router = express.Router();


router.get('/requestToken', (req, res) => {

    const postBody = {
        url: PlatformClient.REQUEST_TOKEN_URL,
        oauth: {
            callback:        PlatformClient.CALLBACK_URL,
            consumer_key:    OAuthInfoProvider.consumerKey,
            consumer_secret: OAuthInfoProvider.consumerSecret
        }
    };

    request.post(postBody, (error, response, data) => {
        const requestToken = qs.parse(data);

        OAuthInfoProvider.setRequestToken(requestToken.oauth_token, requestToken.oauth_token_secret)

        res.status(200).send(PlatformClient.APP_CENTER_URL + requestToken.oauth_token);
    }).on('error', (error) => {
        console.error(error)
    })
});

router.get('/connection', (req, res) => {

    OAuthInfoProvider.realmId = req.query.realmId

    const postBody = {
        url: PlatformClient.ACCESS_TOKEN_URL,
        oauth: {
            consumer_key:    OAuthInfoProvider.consumerKey,
            consumer_secret: OAuthInfoProvider.consumerSecret,
            token:           req.query.oauth_token,
            token_secret:    OAuthInfoProvider.requestTokenSecret,
            verifier:        req.query.oauth_verifier,
            realmId:         OAuthInfoProvider.realmId
        }
    };

    res.send('<script>window.close()</script>');

    request.post(postBody, (e, r, data) => {
        const accessToken = qs.parse(data);

        OAuthInfoProvider.setAccessToken(accessToken)
        io.emit('quickbooks_authentication_success')
    }).on('error', (error) => {
        console.error(error);
    })
});


module.exports = router;