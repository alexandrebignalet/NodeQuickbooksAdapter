'use strict'


import express  from 'express'


import config               from './config'
import quickBooksMiddleware from './quickbooks-client/middleware.quickbooks'

const router = express.Router();


// Middleware add headers
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', config.env.url);
    res.setHeader('Access-Control-Allow-Headers',
        'X-Auth-Token,' +
        'content-type, ' +
        'Access-Control-Allow-Origin' +
        'consumer-key' +
        'consumer-secret' +
        'app-token' +
        'realm-id');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Middleware Quickbooks
router.use('/quickbooks', quickBooksMiddleware)

module.exports = router